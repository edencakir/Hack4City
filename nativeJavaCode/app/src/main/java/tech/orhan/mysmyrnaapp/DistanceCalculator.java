package tech.orhan.mysmyrnaapp;

import static java.lang.Math.acos;
import static java.lang.Math.cos;
import static java.lang.Math.sin;

/**
 * Created by orhan on 05.10.2017.
 */

public class DistanceCalculator {
    static double PI_RAD = Math.PI / 180;

    public static double greatCircleInMeters(double lat1, double long1, double lat2, double long2) {
        return greatCircleInKilometers(lat1, long1, lat2, long2) * 1000;
    }

    public static double greatCircleInKilometers(double lat1, double long1, double lat2, double long2) {
        double phi1 = lat1 * PI_RAD;
        double phi2 = lat2 * PI_RAD;
        double lam1 = long1 * PI_RAD;
        double lam2 = long2 * PI_RAD;

        return 6371.01 * acos(sin(phi1) * sin(phi2) + cos(phi1) * cos(phi2) * cos(lam2 - lam1));
    }
}
