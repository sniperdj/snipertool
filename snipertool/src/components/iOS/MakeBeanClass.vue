<template>
    <div id="iOSJsonBean">
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
        }
    },
    methods: {
        makeiOSInterface: function() {
            this.errMsg = ''
            if (!this.jsonStr) {
                this.interfaceStr = ''
                this.errMsg = '输入不能为空'
                return
            }
            var strClass = '@interface ' + this.className + ' : NSObject' + '<br>' + '<br>';
            try {
                var jsonObj = JSON.parse(this.jsonStr);
                for (const key in jsonObj) {
                    if (jsonObj.hasOwnProperty(key)) {
                        strClass = strClass + '/** <#name#> */' + '<br>'
                        strClass = strClass + '@property (nonatomic, copy)NSString *' + key + '<br>'
                    }
                }
                this.interfaceStr = strClass
            } catch (error) {
                this.errMsg = '输入的不是一个JSON字符串'
            }

            this.className = ''
            this.jsonStr = ''
        }
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

