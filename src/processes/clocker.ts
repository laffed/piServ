import {Builder, By, Key, WebElement} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import ENV from '../config';

type PromiseObj = {success: boolean, status: 'in' | 'out' | 'err' | 'good'};

const clocker = async (method: 'check' | 'clock' | 'login', req_user: string, req_pw: string): Promise<PromiseObj> => {
  let res: PromiseObj = {success: false, status: 'err'};
  const timeClockTxt = 'Click here to access the time clock';
  const driver = await new Builder().forBrowser('chrome')
    .setChromeOptions(
      new chrome.Options().headless().windowSize({width: 100, height: 60})
    )
    .build();

  await driver.manage().window().maximize();
  await driver.get('https://www.cnc-claimsource.com');

  const login = async (): Promise<boolean> => {
    if (await element_exists('username', 'id')) {
      await driver.findElement(By.id('username')).sendKeys(req_user);
      await driver.findElement(By.id('password')).sendKeys(req_pw);
      await driver.findElement(By.id('loginBtn')).click();

      if (!(await element_exists(timeClockTxt, 'inner'))) {
        return false;
      }
      return true;
    }
    return false;
  }

  const element_exists = async (val: string, type: 'id' | 'inner'): Promise<boolean> => {
    try {
      switch (type) {
        case 'id': {
          const id = await driver.findElements(By.id(val));
          return (id.length > 0);
        }
        case 'inner': {
          const inner = await driver.findElements(By.linkText(val));
          return (inner.length > 0);
        }
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  const get_status = async (): Promise<PromiseObj> => {
    try {
      let success = false;
      let status: 'out' | 'in' | 'err' = 'err';

      if (await element_exists('clockin', 'id')) {
        success = true;
        status = 'out';
      } else if (await element_exists('clockout', 'id')) {
        success = true;
        status = 'in';
      }

      return {success, status};

    } catch (e) {
      console.log(e);
      return {success: false, status: 'err'};
    }
  }

  const do_clock_event = async (): Promise<PromiseObj> => {
    try {
      let button: WebElement | false = false;
      let status: 'in' | 'out' | 'err' = 'err';
      if (await element_exists('clockin', 'id')) {
        button = await driver.findElement(By.id('clockin'));
        status = 'in';
      } else if (await element_exists('clockout', 'id')) {
        button = await driver.findElement(By.id('clockout'));
        status = 'out';
      }

      if (button !== false) {
        await button.sendKeys(Key.ENTER);
        //send confirmation
        return {success: true, status};
      }

      return {success: false, status}

    } catch (e) {
      console.log(e);
      return {success: false, status: 'err'};
    }
  }

  // Start of main calls
  const loginStatus = await login();
  if (method === 'login') {
    await driver.quit();
    return {success: loginStatus, status: loginStatus ? 'good' : 'err'}
  }

  await driver.findElement(By.linkText(timeClockTxt)).click();

  if (method === 'check') {
    res = await get_status();
  } else if (method === 'clock') {
    res = await do_clock_event();
  }

  await driver.quit();
  return res;
}

export default clocker;
