using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;
using SeleniumTests.Constants;
using SeleniumTests.Infrastructure.Seeders;
using System.Diagnostics;

namespace SeleniumTests.Fixtures;

public class BaseRemoteFixture : IAsyncLifetime
{
    public IWebDriver WebDriver { get; }
    public BasicSeedingTask BasicSeedingTask { get; private set; }
    public BasicSeedingReport BasicSeedingReport { get; private set; }

    public BaseRemoteFixture()
    {
        var capabilities = new ChromeOptions();
        Dictionary<string, object> browserstackOptions = new Dictionary<string, object>();
        browserstackOptions.Add("resolution", "1920x1080");
        capabilities.AddAdditionalOption("bstack:options", browserstackOptions);
        WebDriver = new RemoteWebDriver(new Uri(Urls.seleniumHub), capabilities);
    }

    public async Task InitializeAsync()
    {
        BasicSeedingTask = new BasicSeedingTask(
            accountsCount: 12,
            notesPerAccountCount: 1,
            directoriesPerAccountCount: 1,
            eventsPerAccountCount: 1,
            imagesPerAccountCount: 1,
            createCollaborators: true);
        BasicSeedingReport = await BasicSeeder.CreateEnvironment(BasicSeedingTask);
    }

    public async Task DisposeAsync()
    {
        await BasicSeeder.CleanEnvironment(BasicSeedingReport);
        WebDriver.Quit();
    }
}
