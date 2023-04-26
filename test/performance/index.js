import puppeteer from "puppeteer"
import lighthouse from "lighthouse"
import fs from "fs"
import { URL } from "url"

const DEV_HOST = "http://localhost:5174"
const PROD_HOST = ""
const HOST = process.env.NODE_ENV == "dev" ? DEV_HOST : PROD_HOST

;(async () => {
    try {
        const USER = { username: "kminchelle", password: "0lelplR" }

        // 啟動 Puppeteer
        const browser = await puppeteer.launch({
            headless: true, // 不需要打開瀏覽器，也可以打開實時觀察
            executablePath: "/opt/homebrew/bin/chromium", // 指定瀏覽器位置
        })
        const page = await browser.newPage()

        // 定義 SPA 的每個不需要登入路由
        const guestRoutes = [{ path: "/login", id: "login" }]

        // 定義 SPA 的每個需要登入路由
        const authRoutes = [
            { path: "/", id: "home" },
            { path: "/a", id: "a" },
            { path: "/b", id: "b" },
            { path: "/c", id: "c" },
        ]

        // 生成不需要登入路由的效能結果
        await generatedPerformanceResult(browser, page, guestRoutes)

        // 登入網站
        await login(page, USER.username, USER.password)

        // 生成需要登入路由的效能結果
        await generatedPerformanceResult(browser, page, authRoutes)

        // 關閉 Puppeteer
        await browser.close()
        console.log(":grinning: 效能判定完成")
    } catch (error) {
        console.log("---")
        console.log(error)
        console.log("---")
    }
})()

async function generatedPerformanceResult(browser, page, routes) {
    for (const route of routes) {
        // 前往路由
        const url = new URL(route.path, HOST)

        await page.goto(url.toString(), { waitUntil: "domcontentloaded" })

        console.log(`:shamrock: 執行${route.id}頁面的效能判定`)

        // 運行 Lighthouse
        const runnerResult = await lighthouse(url.toString(), {
            port: new URL(browser.wsEndpoint()).port,
            output: "html",
            logLevel: "error",
            onlyCategories: ["performance"],
        })

        console.log(`:shamrock: 完成${route.id}頁面的效能判定，正在輸出結果`)
        // 輸出 Lighthouse 結果
        const reportHtml = runnerResult.report
        fs.writeFileSync(
            `test/performance/lighthouse-results-${route.id}.html`,
            reportHtml
        )
        console.log(`:shamrock: 完成${route.id}頁面的效能判定，輸出結果完成`)
    }
}

async function login(page, username, password) {
    // 前往登入頁面

    await page.goto(`${HOST}/login`)

    // 輸入帳號和密碼
    const usernameInput = await page.$("#username")
    await usernameInput.type(username)
    const passwordInput = await page.$("#password")
    await passwordInput.type(password)

    // 點擊登入按鈕
    const loginButton = await page.$("#login-button")
    await loginButton.click()

    await page.waitForNavigation((response) => response.ok())
    console.log(`目前為 ${DEV_HOST}，已登入`)
}
