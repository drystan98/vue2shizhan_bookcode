

Vue.component('input-component', {
    template: '\
    <div class="input-number">\
        <input \
            type="text" \
            :value="currentValue" \
            @change="handleChange"> \
        <button \
            @click="handleDown"\
            :disabled="currentValue <= min">-</button>\
        <button \
            @click="handleUp"\
            :disabled="currentValue >= max">+</button>\
    </div>',
    props: {
        // 最大值
        max: {
            type: Number,
            default: Infinity
        },
        // 最小值
        min: {
            type: Number,
            default: Infinity
        },
        // 当前值
        value: {
            type: Number,
            default: 0
        }
    },
    data: function () {
        return {
            currentValue: this.value
        }
    },
    // 监听
    watch: {
        // 监听currentValue值
        currentValue: function (val) {
            this.$emit('input', val);
            this.$emit('on-change', val);
        },
        // 监听value
        value: function (val) {
            this.updateValue(val);
        }
    },
    // 方法
    methods: {
        // -1方法
        handleDown: function () {
            if (this.currentValue <= this.min) {
                return;
            }
            this.currentValue--;
        },
        // +1方法
        handleUp: function () {
            if (this.currentValue >= this.max) {
                return;
            }
            this.currentValue++;
        },
        // 更新方法
        updateValue: function (val) {
            if (val > this.max) {
                val = this.max;
            }
            if (val < this.min) {
                val = this.min;
            }
            this.currentValue = val;
        },
        // 输入框改变事件
        handleChange: function (event) {
            var val = event.target.value.trim();
            var max = this.max;
            var min = this.min;
            if (isValueNumber(val)) {
                val = Number(val);
                this.currentValue = val;
                if (val > max) {
                    this.currentValue = max;
                } else if (val < min) {
                    this.currentValue = min;
                }
            } else {
                event.target.value = this.currentValue;
            }
        }
    },
    // 计算属性
    mounted: function () {
        // 更新子组件value
        this.updateValue(this.value);
    }

})