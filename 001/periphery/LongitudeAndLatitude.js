/**
 * Created by fjc on 2019/4/16.
 */

/**
 * 经纬度
 * @param option
 * @constructor
 */
var LongitudeAndLatitude = function (option) {

    var longitude = option.longitude;          //经度
    var latitude = option.latitude;            //纬度
    var distance = option.dist || 5000;     //周边距离
    //角度0，90，180，270
    /*
     * 大地坐标系资料WGS-84 长半径a=6378137 短半径b=6356752.3142 扁率f=1/298.2572236
     */
    /** 长半径a=6378137 */
    var a = 6378137;
    /** 短半径b=6356752.3142 */
    var b = 6356752.3142;
    /** 扁率f=1/298.2572236 */
    var f = 1 / 298.2572236;

    this.computerThatLonLat = function (brng) {
        var LongLat = {longitude: 0.00, latitude: 0.00};
        var alpha1 = rad(brng);
        var sinAlpha1 = Math.sin(alpha1);
        var cosAlpha1 = Math.cos(alpha1);
        var tanU1 = (1 - f) * Math.tan(rad(latitude));
        var cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1));
        var sinU1 = tanU1 * cosU1;
        var sigma1 = Math.atan2(tanU1, cosAlpha1);
        var sinAlpha = cosU1 * sinAlpha1;
        var cosSqAlpha = 1 - sinAlpha * sinAlpha;
        var uSq = cosSqAlpha * (a * a - b * b) / (b * b);
        var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
        var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
        var cos2SigmaM = 0;
        var sinSigma = 0;
        var cosSigma = 0;
        var sigma = distance / (b * A), sigmaP = 2 * Math.PI;
        while (Math.abs(sigma - sigmaP) > 1e-12) {
            cos2SigmaM = Math.cos(2 * sigma1 + sigma);
            sinSigma = Math.sin(sigma);
            cosSigma = Math.cos(sigma);
            var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
            sigmaP = sigma;
            sigma = distance / (b * A) + deltaSigma;
        }

        var tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
        var lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1,
            (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
        var lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
        var C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
        var L = lambda - (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));

        LongLat.longitude = longitude + deg(L);
        LongLat.latitude = deg(lat2);
        return LongLat;
    }

    //计算指定经纬个各个象限的最大经纬度

    rad = function (d) {
        return d * Math.PI / 180.0; // 弧度
    }
    deg = function (x) {
        return x * 180 / Math.PI;   //度
    }


}


