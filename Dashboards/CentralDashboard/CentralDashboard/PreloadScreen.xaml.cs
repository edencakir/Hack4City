using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Threading;

namespace CentralDashboard
{
    /// <summary>
    /// PreloadScreen.xaml etkileşim mantığı
    /// </summary>
    public partial class PreloadScreen
    {
        private TextBlock mNumber;
        private TextBlock dNumber;
        private TextBlock iNumber;

        private DispatcherTimer dispatcherTimer;

        /*
         * AIzaSyAdoqP3R3iuebZi9SfiQu313MeacdyRtsk
         */

        public PreloadScreen()
        {
            InitializeComponent();

            mNumber = this.MetroNumber;
            dNumber = this.DurakNumber;
            iNumber = this.IzbanNumber;

            mNumber.Text = "0";
            dNumber.Text = "0";
            iNumber.Text = "0";

            dispatcherTimer = new DispatcherTimer();
            dispatcherTimer.Interval = TimeSpan.FromSeconds(3);
            dispatcherTimer.Tick += TimerCallback;
            dispatcherTimer.Start();
            
        }

        private void TimerCallback(object sender, EventArgs e)
        {
            HttpClient dClient = new HttpClient();
            dClient.BaseAddress = new Uri("http://54.163.77.75:8080/");
            dClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage dResponse = dClient.GetAsync("api/durak").Result;
            if (dResponse.IsSuccessStatusCode && dResponse != null)
            {
                var dString = dResponse.Content.ReadAsStringAsync().Result;
                JObject s = JObject.Parse(dString);
                if(s["response"]["data"].ToString() != "[]")
                {
                    dNumber.Text = s["response"]["data"][0]["kisi"].ToString();
                }
            }

            HttpClient iClient = new HttpClient();
            iClient.BaseAddress = new Uri("http://54.163.77.75:8080/");
            iClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage iResponse = iClient.GetAsync("api/izban").Result;
            if (iResponse.IsSuccessStatusCode && iResponse != null)
            {
                var iString = iResponse.Content.ReadAsStringAsync().Result;
                JObject i = JObject.Parse(iString);
                if(i["response"]["data"].ToString() != "[]")
                {
                    iNumber.Text = i["response"]["data"][0]["kisi"].ToString();
                }
            }

            HttpClient mClient = new HttpClient();
            mClient.BaseAddress = new Uri("http://54.163.77.75:8080/");
            mClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage mResponse = mClient.GetAsync("api/metro").Result;
            if (mResponse.IsSuccessStatusCode && mResponse != null)
            {
                var mString = mResponse.Content.ReadAsStringAsync().Result;
                JObject x = JObject.Parse(mString);
                if(x["response"]["data"].ToString() != "[]")
                {
                    mNumber.Text = (string)x["response"]["data"][0]["kisi"].ToString();
                }
            }
        }

        private void WindowLoaded(object sender, RoutedEventArgs e)
        {
            
        }
        
    }
}
