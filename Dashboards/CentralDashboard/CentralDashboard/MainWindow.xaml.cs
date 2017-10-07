using System;
using System.Windows.Threading;

namespace CentralDashboard
{
    /// <summary>
    /// MainWindow.xaml etkileşim mantığı
    /// </summary>
    public partial class MainWindow
    {
        private PreloadScreen preloadScreen;
        private DispatcherTimer navigationTimer;

        public MainWindow()
        {
            InitializeComponent();
            navigationTimer = new DispatcherTimer();
            navigationTimer.Interval = TimeSpan.FromSeconds(4);
            navigationTimer.Tick += TimerCallback;
            navigationTimer.Start();
        }

        private void TimerCallback(object sender, EventArgs e)
        {
            DispatcherTimer timer = (DispatcherTimer)sender;
            timer.Stop();
            timer.Tick -= TimerCallback;
            preloadScreen = new PreloadScreen();
            preloadScreen.Show();

            this.Close();
        }
    }
}
