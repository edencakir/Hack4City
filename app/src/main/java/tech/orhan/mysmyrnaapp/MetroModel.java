package tech.orhan.mysmyrnaapp;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

/**
 * Created by orhan on 06.10.2017.
 */

public class MetroModel {
    @SerializedName("duraklar")
    public ArrayList<DurakObject> list;

    public class DurakObject {
        @SerializedName("ad")
        public String name;
        @SerializedName("koorLat")
        public String koorLat;
        @SerializedName("koorLng")
        public String koorLng;
    }
}
