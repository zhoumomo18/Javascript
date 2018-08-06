//4 . 工具函数

function createEle(tag) {//创建标签
    return document.createElement(tag);
}

function hashInLicalStorage(name) {//获取的local值
    return JSON.parse(localStorage.getItem(name) || 'null');
}

function init() {//初始数据
    var aArr = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ];
    var oHash = {
        'b': 'baidu.com', 'z': 'zhihu.com', 'q': 'qq.com', 'b': 'bilibili.com', 'k': 'kugou.com',
        'w': 'developer.mozilla.org', 't': 'taobao.com', 'd': 'douyu.com', 'm': 'mgtv.com'
    };
    var oGetlocal = hashInLicalStorage('date');
    if (oGetlocal) {
        oHash = oGetlocal;
    }

    return {
        'aArr': aArr,
        'oHash': oHash
    }
}

function keyboard(aArr, oHash) {
    var okeyBor = document.getElementById('keyBor');

    for (var index = 0; index < aArr.length; index++) {

        var oKeyRow = aArr[index];//获取三行数组

        var oDiv = createEle('div');
        okeyBor.appendChild(oDiv)

        for (var index2 = 0; index2 < oKeyRow.length; index2++) {

            var aLet = oKeyRow[index2];//三行数组中字母
            var aHash = oHash[aLet];//hash的key

            var oSpan = creatSpan(aLet);
            var oKbd = creatOkd('key');
            var oImg = creatImg(aHash);
            var oBtn = creatBtn();

            oDiv.appendChild(oKbd);
        }
    }
    return;

    function creatSpan(let) {//创建span
        var span = createEle('span');
        span.textContent = let;
        span.id = let;
        return span;
    }

    function creatOkd(className) {//创建okd
        var kbd = createEle('Kbd');
        kbd.appendChild(oSpan);
        kbd.className = className;
        return kbd;
    }

    function creatImg(arr) {//创建img
        var img = createEle('img');
        var oDomain = arr;
        oKbd.appendChild(img);
        if (oDomain) {
            img.src = 'http://' + oDomain + '/favicon.ico';
        } else {
            img.src = 'https://i.loli.net/2018/08/05/5b66c2bb6a74c.png'
        }
        img.onerror = function (event) {
            event.target.src = 'https://i.loli.net/2018/08/05/5b66c2bb6a74c.png'
        }
        return img;
    }

    function creatBtn() {//创建btn
        var btn = createEle('button');
        btn.textContent = '编辑';
        oKbd.appendChild(btn);
        btn.onclick = function (event) {
            var x = prompt('请输入网址');
            var btn2 = event.target;
            var img2 = btn2.previousSibling;
            var id = img2.previousSibling.id;

            img2.src = 'http://' + x + '/favicon.ico'
            img2.onerror = function (event) {
                event.target.src = 'https://i.loli.net/2018/08/05/5b66c2bb6a74c.png'
            }
            oHash[id] = x;
            localStorage.setItem('date', JSON.stringify(oHash));

        }
        return btn;
    }
}
