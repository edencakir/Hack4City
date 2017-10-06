package tech.orhan.mysmyrnaapp;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Typeface;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.StrictMode;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.support.annotation.RequiresApi;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.widget.TextView;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Locale;
import java.util.concurrent.ExecutionException;

public class MainActivity extends AppCompatActivity implements RecognitionListener,
        LocationListener, TextToSpeech.OnInitListener, SensorEventListener {

    private static final int PERMISSION_AUDIO = 3;

    private SpeechRecognizer mainSr;
    private Intent mIntent;
    private TextView titleText;
    private TextView centerText;
    private ArrayList<String> mBusDirections;
    private ArrayList<String> mPassingBus;
    private String detectedWord = null;
    private double currentLat;
    private double currentLng;
    private TextToSpeech mTextToSpeech;
    private SensorManager mSensorManager;
    private Sensor mSensor;
    private float[] accData;
    private boolean asyncFlag = true;
    private String nearestStop;

    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
        // Vibrate for 500 milliseconds
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            v.vibrate(VibrationEffect.createOneShot(500, 10));
        }
        else {
            v.vibrate(500);
        }

        requestWindowFeature(Window.FEATURE_CUSTOM_TITLE);
        setContentView(R.layout.activity_main);
        getWindow().setFeatureInt(Window.FEATURE_CUSTOM_TITLE, R.layout.title_resource);

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        mBusDirections = new ArrayList<>();
        mPassingBus = new ArrayList<>();
        accData = new float[3];

        mTextToSpeech = new TextToSpeech(this, this);

        titleText = (TextView) findViewById(R.id.title_text);
        Typeface customFont = Typeface.createFromAsset(getAssets(), "fonts/dosis_regular.ttf");
        titleText.setTypeface(customFont);

        centerText = (TextView) findViewById(R.id.main_text);
        centerText.setTypeface(customFont);

        mSensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        mSensor = mSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);

        LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, this);

        if(checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED){
            ActivityCompat.requestPermissions(MainActivity.this,
                    new String[]{Manifest.permission.RECORD_AUDIO}, PERMISSION_AUDIO);
        }
        else {
            startService(new Intent(getBaseContext(), BackgroundTasks.class));

            mainSr = SpeechRecognizer.createSpeechRecognizer(getApplicationContext());
            mainSr.setRecognitionListener(this);
            mIntent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
            mIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, "tr-TR");
            mIntent.putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, "org.nix_dev.meta.testdatalayerapi");
            mIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                    RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
            mIntent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 700);
            mIntent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
            mainSr.startListening(mIntent);
        }

    }

    @Override
    public void onDestroy() {
        if(mTextToSpeech != null) {
            mTextToSpeech.stop();
            mTextToSpeech.shutdown();
        }
        super.onDestroy();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions,
                                           int[] grantResults) {
        if (requestCode == PERMISSION_AUDIO) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Log.i("App", "GRANTED.");
            } else {

            }
        }
    }

    @Override
    public void onReadyForSpeech(Bundle bundle) {
        Log.i("MAIN_SR", "MAIN_READY");
    }

    @Override
    public void onBeginningOfSpeech() {

    }

    @Override
    public void onRmsChanged(float v) {

    }

    @Override
    public void onBufferReceived(byte[] bytes) {

    }

    @Override
    public void onEndOfSpeech() {
        Log.i("END", "END_OF_SPEECH");
        if(detectedWord != null) {
            try {
                Document doc = Jsoup.connect("http://www.eshot.gov.tr/tr/UlasimSaatleri/288").get();
                Elements allBuses = doc.getElementsByTag("option");
                for(Element e : allBuses) {
                    mBusDirections.add(Jsoup.parse(e.text()).text());
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            boolean isIncludes;
            for(String s : mBusDirections) {
                isIncludes = s.toLowerCase().split("-")[1].contains(detectedWord.toLowerCase());
                if(isIncludes) {
                    Log.i("INCLUDE", s.split(" ")[0]);
                    mPassingBus.add(s.split(" ")[0]);
                }
                mTextToSpeech.speak("Konumunuz alınıyor", TextToSpeech.QUEUE_FLUSH, null);
            }

        }
    }

    @Override
    public void onError(int i) {
        Log.i("ERR", "ERR");
    }

    @Override
    public void onResults(Bundle bundle) {

    }

    @Override
    public void onPartialResults(Bundle bundle) {
        ArrayList data = bundle.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        detectedWord = (String) data.get(data.size() - 1);
        Log.i("TEST", "main_partial_results: " + detectedWord);

    }

    @Override
    public void onEvent(int i, Bundle bundle) {

    }

    @Override
    public void onLocationChanged(Location location) {
        currentLat = location.getLatitude();
        currentLng = location.getLongitude();

        if(asyncFlag) {
            try {
                nearestStop = new AsyncWorks(getApplicationContext()).execute(currentLat, currentLng).get();
                if(nearestStop != null) {
                    mTextToSpeech.speak("Size en yakın metro durağı" + nearestStop.split(" ")[0], TextToSpeech.QUEUE_FLUSH, null);
                    if(Double.parseDouble(nearestStop.split(" ")[nearestStop.split(" ").length - 1]) > 6000) {
                        mTextToSpeech.speak("En yakın istasyon ile aranızdaki mesafe çok fazla", TextToSpeech.QUEUE_FLUSH, null);
                    }
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
            asyncFlag = false;
        }
    }

    @Override
    public void onStatusChanged(String s, int i, Bundle bundle) {

    }

    @Override
    public void onProviderEnabled(String s) {

    }

    @Override
    public void onProviderDisabled(String s) {

    }

    @Override
    public void onInit(int i) {
        if(i == TextToSpeech.SUCCESS) {
            Locale locale = new Locale("tr", "TR");
            int result = mTextToSpeech.setLanguage(locale);
            if (result == TextToSpeech.LANG_MISSING_DATA
                    || result == TextToSpeech.LANG_NOT_SUPPORTED)
                Log.e("TTS", "Language is not supported");
        }
        else {
            Log.i("ERR", "ERR_TTS");
        }
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        final float alpha = 0.8f;
        float[] gravity = new float[3];

        // Isolate the force of gravity with the low-pass filter.
        gravity[0] = alpha * gravity[0] + (1 - alpha) * event.values[0];
        gravity[1] = alpha * gravity[1] + (1 - alpha) * event.values[1];
        gravity[2] = alpha * gravity[2] + (1 - alpha) * event.values[2];

        // Remove the gravity contribution with the high-pass filter.
        accData[0] = event.values[0] - gravity[0];
        accData[1] = event.values[1] - gravity[1];
        accData[2] = event.values[2] - gravity[2];
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }
}
