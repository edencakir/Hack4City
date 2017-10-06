package tech.orhan.mysmyrnaapp;

import android.app.Application;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.CountDownTimer;
import android.util.Log;

import org.altbeacon.beacon.BeaconManager;
import org.altbeacon.beacon.BeaconParser;
import org.altbeacon.beacon.Region;
import org.altbeacon.beacon.startup.BootstrapNotifier;
import org.altbeacon.beacon.startup.RegionBootstrap;

/**
 * Created by orhan on 06.10.2017.
 */

public class mysmyrnaapp extends Application implements BootstrapNotifier {
    private static final String TAG = ".mysmyrnaapp";
    private RegionBootstrap regionBootstrap;
    private CountDownTimer mTimer;
    private Intent mIntent;

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "App started up");
        BeaconManager beaconManager = BeaconManager.getInstanceForApplication(this);
        // To detect proprietary beacons, you must add a line like below corresponding to your beacon
        // type.  Do a web search for "setBeaconLayout" to get the proper expression.
        beaconManager.getBeaconParsers().add(new BeaconParser().
                setBeaconLayout(BeaconParser.EDDYSTONE_URL_LAYOUT));

        mIntent = new Intent(this, SplashActivity.class);
        mIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        PendingIntent pIntent = PendingIntent.getActivity(this, (int) System.currentTimeMillis(), mIntent, 0);

        final Notification n  = new Notification.Builder(this)
                .setContentTitle("Fazla mı bekliyorsunuz?")
                .setContentText("Hemen iletiliyor.")
                .setSmallIcon(R.drawable.buyuksehir)
                .setContentIntent(pIntent)
                .setAutoCancel(true).build();

        final NotificationManager notificationManager =
                (NotificationManager) getSystemService(NOTIFICATION_SERVICE);

        mTimer = new CountDownTimer(30000, 1000) {
            @Override
            public void onTick(long l) {
                Log.i("TICK", String.valueOf(l));
            }

            @Override
            public void onFinish() {
                notificationManager.notify(0, n);
                startActivity(mIntent);
            }
        };

        beaconManager.setDebug(true);

        // wake up the app when any beacon is seen (you can specify specific id filers in the parameters below)
        Region region = new Region("all-beacons-region", null, null, null);
        regionBootstrap = new RegionBootstrap(this, region);
    }

    @Override
    public void didDetermineStateForRegion(int arg0, Region arg1) {
        // Don't care
    }

    @Override
    public void didEnterRegion(Region arg0) {
        Log.i(TAG, "Got a didEnterRegion call");
        mTimer.start();
        // IMPORTANT: in the AndroidManifest.xml definition of this activity, you must set android:launchMode="singleInstance" or you will get two instances
        // created when a user launches the activity manually and it gets launched from here.

    }

    @Override
    public void didExitRegion(Region arg0) {
        // Don't care
        mTimer.cancel();
    }
}
