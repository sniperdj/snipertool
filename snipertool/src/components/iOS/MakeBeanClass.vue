<template>
    <div id="iOSJsonBean">
        <router-link to="/">返回</router-link>
        <div class="jsonInfoClass">
            类名:
            <br>
            <input type="text" v-model="className">
            <br>
            JSON字符串:
            <br>
            <input style="width:80%; height:200px;" type="textarea" v-model="jsonStr">
        </div>
        <div class="operationClass">
            <input type="button" value="生成interface" @click="makeiOSInterface">
            <br>
            <div>{{ errMsg }}</div>
        </div>
        <div class="interfaceInfoClass">
            <div v-html="interfaceStr"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'iOSJsonBean',
    data() {
        return {
            className: '',
            jsonStr: '',
            interfaceStr: '',
            errMsg: '',
            strClass: ''
        }
    },
    methods: {
        makeiOSInterface: function() {
            this.errMsg = ''
            this.interfaceStr = ''
            if (!this.jsonStr) {
                this.interfaceStr = ''
                this.errMsg = '输入不能为空'
                return
            }
            var jsonObj = JSON.parse(this.jsonStr);
            this.makeProperty(this.className, jsonObj)
            this.className = ''
            // this.jsonStr = ''
            this.strClass = ''
        },

        makeProperty: function (clsName, jsonObj) {
            var strClass = '<hr><hr>'
            strClass = strClass + '@interface ' + clsName + ' : NSObject' + '<br>' + '<br>';
            
            try {
                // var jsonObj = JSON.parse(jsonObj);
                if (Object.keys(jsonObj).length == 0) {
                    this.errMsg = "空对象了"
                    return;
                }
                for (const key in jsonObj) {
                    // if (jsonObj.hasOwnProperty(key)) {
                        strClass = strClass + '/** <#name#> */' + '<br>'
                        strClass = strClass + '@property (nonatomic, copy)NSString *' + key + '<br>'
                    // }
                }
                for (const key in jsonObj) {
                    // if (jsonObj.hasOwnProperty(key)) {
                        var val = jsonObj[key]
                        var isInstance = val instanceof Object // 是不是对象
                        var isArray = val instanceof Array  // 是不是数组
                        let capitalKey = key.charAt(0).toUpperCase() + key.slice(1)
                        if (isArray) {
                            this.makeProperty(capitalKey, val[0]);
                        } else if (isInstance) {
                            this.makeProperty(capitalKey, val);
                        }
                    // }
                }
                this.interfaceStr = strClass + this.interfaceStr
            } catch (error) {
                this.errMsg = '输入的不是一个JSON字符串'
                console.log(error)
            }
        },
        
    },
}
</script>
<style scoped>
    .jsonInfoClass {
        width: 90%;
        height: 260px;
        margin-bottom:40px;
    }
    .operationClass {
        width:200px;
        height: 80px;
    }
    .interfaceInfoClass {
        padding: 20px;
        width: 90%;
        height: 200px;
    }
</style>

