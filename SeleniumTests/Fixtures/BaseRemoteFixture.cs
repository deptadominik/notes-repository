﻿using OpenQA.Selenium;
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
        WebDriver = new RemoteWebDriver(new Uri(Urls.seleniumHub), new ChromeOptions());
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
