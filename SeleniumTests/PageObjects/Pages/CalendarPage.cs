﻿using OpenQA.Selenium;
using SeleniumTests.Infrastructure;
using SeleniumTests.PageObjects.Modals;

namespace SeleniumTests.PageObjects.Pages;

public class CalendarPage
{
    private IWebDriver driver;
    private readonly IWebElement calendar;

    private readonly By calendarSelector = By.XPath("//div[@class='rz-scheduler']");
    private readonly By currentDaySelector = By.XPath("//div[@style='background: rgba(255,220,40,.2);']");
    private readonly By closeToastButton = By.XPath("//button[@class='blazored-toast-close']");
    private By Event(string eventTitle) => By.XPath($"//div[@title='{eventTitle}']");

    public CalendarPage(IWebDriver driver)
    {
        this.driver = driver;
        calendar = driver.WaitUntilElementExists(calendarSelector);
    }

    public AddEventModal ClickOnCurrentDay()
    {
        calendar.FindElement(currentDaySelector).Click();

        return new AddEventModal(driver);
    }

    public EditEventModal ClickOnEvent(string eventTitle, bool waitForVisibleElement = true)
    {
        if (waitForVisibleElement)
            driver.WaitUntilElementExists(Event(eventTitle));
        calendar.FindElement(Event(eventTitle)).Click();

        return new EditEventModal(driver);
    }

    public CalendarPage CloseNotification()
    {
        driver.WaitUntilElementExists(closeToastButton);
        calendar.FindElement(closeToastButton).Click();

        return this;
    }
}
