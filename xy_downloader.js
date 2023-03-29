// ==UserScript==
// @name         小雅课程资源下载助手
// @name:zh-CN   小雅课程资源下载助手
// @name:zh-TW   小雅課程資源下載助手
// @name:en      Xiaoya Course Resource Downloader
// @namespace    https://github.com/afeng616/PublicScripts
// @version      0.1
// @description  一键下载小雅课程资源附件
// @description:zh-TW 一鍵下載小雅課程資源附件
// @description:en One-click download Xiaoya course resource attachments
// @author       afeng
// @license      GPL-3.0 License
// @match        http://xy.ai-augmented.com/mycourse/*/resource*
// @icon         http://cloud-course-publication.oss-cn-shanghai.aliyuncs.com/prodFile/b8f7df9ec2a140f29245dab83207fabd.png?response-content-disposition=inline&Expires=1679989621&OSSAccessKeyId=LTAI5tGtZ8txSmQFLhrdFmcg&Signature=Qnzszikrd4wWDRudGfkfddoVRVs%3D
// @grant        none
// ==/UserScript==

'use strict';

let course_resources;

// 下载
function download(url){
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.style.height = 0;
    iframe.src = url;
    // 与前两种方式不同，iframe需要挂载到页面上才能触发请求
    document.body.appendChild(iframe);
    setTimeout(() => {
    iframe.remove();
    }, 1000);

}

// 附件下载实现细节
window.download_resources = function(){
    var download_url = 'http://api-oresource.ai-augmented.com/cloud/file_url/';
    for (let i in course_resources) {
        let file_name = course_resources[i].name;
        if (course_resources[i].mimetype) {
            fetch(download_url + course_resources[i].quote_id).then(function(response) {
                return response.json();
            }).then(function(data) {
                if (data.success){
                    download(data.data.url)
                    console.oldLog('::download', file_name);
                }
            }).catch(function(e) {
                console.oldLog('!!error', e);
            });

        }
    }
}

// 添加下载按钮
function add_download_button() {
    var element = '<div style="position:fixed; left:80px; bottom:50px; z-index:999" onclick="download_resources()"><svg t="1680053155014" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8308" width="60px" height="60px"><path d="M389.842311 369.275391c0 0-54.207599-52.138474-127.760802-9.55461-65.813938 40.649815-54.193273 115.050316-54.193273 115.050316S61.690526 503.173984 61.690526 652.223648c3.281743 148.84091 158.777213 150.336984 158.777213 150.336984l309.799812-0.467651L386.531915 672.168909l79.646991 0.864694 0.013303-157.420309 102.108562-0.694825 0.732687 157.684322 77.813227 1.106194L530.266527 802.560632l262.197654 0c0 0 144.715963 0.148379 165.04087-141.442406 9.680477-154.855904-139.875724-185.378058-139.875724-185.378058s17.017582-229.233891-193.000666-255.367085C444.611705 201.987341 389.842311 369.275391 389.842311 369.275391z" fill="#fcbb34" p-id="8309"></path></svg></div>';
    var body = document.getElementById('root');
    var div = document.createElement('div');
    div.innerHTML = element;
    body.appendChild(div);
}

window.onload = ()=> {
    console.oldLog = console.log;
    console.log = (...data) =>{
        if (data[0] == 'nodesToData')
        {
            course_resources = data[1];
            console.oldLog('::', course_resources);
        }
    };

    add_download_button();
};



