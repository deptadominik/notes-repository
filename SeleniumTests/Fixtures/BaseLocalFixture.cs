﻿using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using SeleniumTests.Infrastructure.Seeders;

namespace SeleniumTests.Fixtures;

public class BaseLocalFixture : IAsyncLifetime
{
    public IWebDriver WebDriver { get; }
    public BasicSeedingTask BasicSeedingTask { get; private set; }
    public BasicSeedingReport BasicSeedingReport { get; private set; }
        
    public BaseLocalFixture()
    {
        WebDriver = new ChromeDriver(new ChromeOptions());
    }

    public async Task InitializeAsync()
    {
        BasicSeedingTask = new BasicSeedingTask(
            accountsCount: 12,
            notesPerAccountCount: 1,
            directoriesPerAccountCount: 1,
            eventsPerAccountCount: 1,
            imagesPerAccountCount: 1,
            createCollaborators: false);
        BasicSeedingReport = await BasicSeeder.CreateEnvironment(BasicSeedingTask);
    }

    public async Task DisposeAsync()
    {
        await BasicSeeder.CleanEnvironment(BasicSeedingReport);
        WebDriver.Quit();
    }
}
