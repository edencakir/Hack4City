package tech.orhan.mysmyrnaapp;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.Bundle;
import android.os.IBinder;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.support.annotation.Nullable;
import android.util.Log;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Objects;

/**
 * Created by orhan on 04.10.2017.
 */

public class BackgroundTasks extends Service implements RecognitionListener {

    public BackgroundTasks() {

    }

    private static final String TAG = "MyActivity";
    private SpeechRecognizer sr;
    private Intent speechIntent;
    private IBinder mBinder = new VoiceBinder();

    @Override
    public void onCreate() {
        super.onCreate();

        sr = SpeechRecognizer.createSpeechRecognizer(getApplicationContext());
        sr.setRecognitionListener(this);
        speechIntent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        speechIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, "tr-TR");
        speechIntent.putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, "org.nix_dev.meta.testdatalayerapi");
        speechIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        speechIntent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 500);
        speechIntent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
        sr.startListening(speechIntent);

        Log.i("START", "STARTED");
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.i("DESTROY", "DESTROYED");
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }

    @Override
    public void onReadyForSpeech(Bundle bundle) {
        Log.d(TAG, "onReadyForSpeech");
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

    }

    @Override
    public void onError(int i) {

    }

    @Override
    public void onResults(Bundle bundle) {

    }

    @Override
    public void onPartialResults(Bundle bundle) {
        Intent dialogIntent = new Intent(this, SplashActivity.class);
        dialogIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        ArrayList data = bundle.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        String word = (String) data.get(data.size() - 1);

        if(Objects.equals(word, "uygulama")) {
            startActivity(dialogIntent);
        }

        Log.i("TEST", "partial_results: " + word);
    }

    @Override
    public void onEvent(int i, Bundle bundle) {

    }

    public class VoiceBinder extends Binder {

        BackgroundTasks getService() {
            return BackgroundTasks.this;
        }
    }
}
