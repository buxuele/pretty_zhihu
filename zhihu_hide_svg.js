// zhihu_hide_svg.js
// 隐藏知乎页面上的特定元素：
// 1. 所有的 4角星 SVG 图标 (AI 生成内容标记)
// 2. 专栏文章页面的右侧推荐栏

(function() {
    'use strict';

    const hideZhihuElements = () => {
        // 1. 隐藏 4角星 SVG 图标
        // 这个 class name 是固定的
        document.querySelectorAll('.ZDI--FourPointedStar16').forEach(svg => {
            if (svg.style.display !== 'none') {
                svg.style.display = 'none';
            }
        });

        // 2. 隐藏专栏文章页的右侧推荐栏
        // 使用属性选择器 [class*="..."] 来匹配 class 名称中包含 "Post-Row-Content-right" 的元素
        // 这样做更稳定，因为像 "css-1qyytj7" 这样的部分是动态生成的，会变化。
        document.querySelectorAll('[class*="Post-Row-Content-right"]').forEach(div => {
            if (div.style.display !== 'none') {
                div.style.display = 'none';
            }
        });
    };

    // 初始运行一次，尽快隐藏元素
    hideZhihuElements();

    // 设置定时器，应对知乎动态加载内容的情况
    const intervalId = setInterval(hideZhihuElements, 500); // 每 0.5 秒检查一次

    // 使用 MutationObserver 提高效率 (推荐的进阶方式)
    // 它可以更及时地响应页面变化，且比 setInterval 性能更好
    const observer = new MutationObserver(hideZhihuElements);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 可选：一段时间后可以清除定时器，因为 MutationObserver 已经接管
    // setTimeout(() => clearInterval(intervalId), 10000);

})();