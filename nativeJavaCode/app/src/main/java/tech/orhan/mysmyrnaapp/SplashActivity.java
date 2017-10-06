package tech.orhan.mysmyrnaapp;

import android.content.Intent;
import android.graphics.Typeface;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.WindowManager;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.TextView;

import java.util.Timer;
import java.util.TimerTask;

public class SplashActivity extends AppCompatActivity {
    private TextView tx;
    private TextView perceptronTx;
    private Animation animation;
    private Timer timer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        timer = new Timer();

        tx = (TextView)findViewById(R.id.hack_text);
        Typeface customFont = Typeface.createFromAsset(getAssets(), "fonts/dosis_regular.ttf");
        tx.setTypeface(customFont);

        perceptronTx = (TextView) findViewById(R.id.perceptron_text);
        perceptronTx.setTypeface(customFont);

        animation = AnimationUtils.loadAnimation(this, R.anim.fade_in);

        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                timerMethod();
            }
        }, 0, 6000);

        final Thread myThread = new Thread(){
            @Override
            public void run() {
                try {
                    sleep(6000);
                    Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                    startActivity(intent);
                    overridePendingTransition(R.anim.transition_animation_out, R.anim.transition_animation);
                    finish();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };
        myThread.start();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            tx.startAnimation(animation);
        }
    }

    private void timerMethod() {
        this.runOnUiThread(timerTick);
    }

    private Runnable timerTick = new Runnable() {
        @Override
        public void run() {
            perceptronTx.startAnimation(animation);
        }
    };
}
