package tech.orhan.mysmyrnaapp;

import android.content.Context;
import android.content.res.Resources;
import android.os.AsyncTask;
import android.util.Log;

import com.google.gson.Gson;

import java.io.IOException;
import java.io.InputStream;
import java.text.NumberFormat;

/**
 * Created by orhan on 05.10.2017.
 */

public class AsyncWorks extends AsyncTask<Double, Void, String> {

    private Resources assetManager;

    public AsyncWorks(Context context) {
        assetManager = context.getResources();
    }

    @Override
    protected String doInBackground(Double... doubles) {
        String json = inputStreamToString(assetManager.openRawResource(R.raw.metro));
        MetroModel mModel = new Gson().fromJson(json, MetroModel.class);

        int index;
        double smallestValue = 300000;
        String nameOf = null;
        for(index=0; index<mModel.list.size(); index++) {
            double current = DistanceCalculator.greatCircleInMeters(doubles[0],
                    doubles[1], Double.parseDouble(mModel.list.get(index).koorLat),
                    Double.parseDouble(mModel.list.get(index).koorLng));
            if(current < smallestValue) {
                smallestValue = current;
                nameOf = mModel.list.get(index).name + " " + String.valueOf(smallestValue);
            }
        }

        return nameOf;
    }

    public String inputStreamToString(InputStream inputStream) {
        try {
            byte[] bytes = new byte[inputStream.available()];
            inputStream.read(bytes, 0, bytes.length);
            String json = new String(bytes);
            return json;
        } catch (IOException e) {
            return null;
        }
    }

}
