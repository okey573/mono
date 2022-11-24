import { defineComponent, ref } from 'vue'
import { Menu as IconMenu, ArrowDown, Magnet } from '@element-plus/icons-vue'

import './index.scss'

const Layout = defineComponent({
  name: 'Layout',
  components: {
    IconMenu,
    ArrowDown,
    Magnet
  },
  setup() {


    const isCollapse = ref(false)
    const activePath = ref<string>('/')

    const toggleCollapse = () => {
      isCollapse.value = !isCollapse.value
    }

    return () => <div class="layout">
      <div class="navigation">
        <div class="logo" onClick={toggleCollapse}>
          <img src="/favicon.ico" alt="" />
        </div>
        <div class="flex-grow" />
        <div class="navigation-menu">
          <el-dropdown v-slots={{
            dropdown: () => <>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <a href="https://element-plus.org/zh-CN/" target="_blank">Element-Plus</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </>
          }}>
            <span>
                 相关链接
                 <el-icon style={{'margin-left': '10px'}}>
                   <arrow-down />
                 </el-icon>
               </span>
          </el-dropdown>
        </div>
      </div>

      <div class="content">
        <div class="side-menu">
          <el-menu
            class="el-menu-vertical-demo"
            default-active={ activePath.value }
            router
            collapse={ isCollapse.value }
          >
            <el-menu-item index="/views/test" v-slots={ {
              title: () => <span>测试</span>
            } }>
              <el-icon><Magnet /></el-icon>
            </el-menu-item>

            <el-menu-item index="/views/profitAndLoss" v-slots={ {
              title: () => <span>盈亏板</span>
            } }>
              <el-icon>
                <icon-menu />
              </el-icon>
            </el-menu-item>
          </el-menu>
        </div>

        <div class="flex-grow router-view-wrapper">
          <router-view></router-view>
        </div>
      </div>
    </div>
  }
})

export default Layout
