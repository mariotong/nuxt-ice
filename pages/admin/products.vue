<template lang="pug">
.content
  .related-products
    table.table
      thead
        tr
          th 图片
          th 标题
          th 价格
          th 简介
          th 参数
          th 修改
      tbody
        tr(v-for='item in products')
          td
            .img(v-for='image in item.images')
              img(:src='image + "?imageView2/1/format/jpg/q/75/imageslim"')
          td {{item.title}}
          td {{item.price}}
          td(v-html='item.intro')
          td
            p(v-for='parameter in item.parameters') {{parameter.key}} {{parameter.value}}
          td
            button.btn(@click='editProduct(item)')
              .material-icon edit
            button.btn(@click='deleteProduct(item)')
              .material-icon delete
  .edit-product(:class='{active: editing}')
    .edit-header
      .material-icon edit
      div(style='flex: 1')
        .material-icon(@click='editing =! editing') close
    .edit-body
      .form.edit-form
        .input-group
          label 标题
          input(v-model='edited.title')
        .input-group
          label 价格
          input(v-model='edited.price', type='number')
        .input-group
          label 简介
          textarea(v-model='edited.intro', @keyup='editedIntro')
        .input-group
          label 图片
          .upload-images
            .img(v-for='item, index in edited.images')
              img(:src='item + "?imageView2/1/format/jpg/q/75/imageslim"')
              .tools
                .material-icon(@click='deleteImg(index)') delete
            .upload-btn(id="container")
              g#Page-1(stroke='none', stroke-width='1', fill='none', fill-rule='evenodd')
                g#ic_backup_black_24px(transform='translate(-1.000000, -6.000000)')
                  polygon#Shape(points='0 0 55 0 55 55 0 55')
                  path#outline(d='M42.6907609,20.7503727 C41.2853571,13.6200155 35.0230435,8.26708075 27.5,8.26708075 C21.5270342,8.26708075 16.339441,11.6565839 13.7559783,16.6168323 C7.535,17.2781988 2.69875776,22.5484627 2.69875776,28.9347826 C2.69875776,35.7757919 8.25836957,41.3354037 15.0993789,41.3354037 L41.9673913,41.3354037 C47.671677,41.3354037 52.3012422,36.7058385 52.3012422,31.0015528 C52.3012422,25.5452795 48.0643634,21.1223913 42.6907609,20.7503727 Z', stroke='#78909C', stroke-width='3', :stroke-dasharray='upload.dasharray', :stroke-dashoffset='upload.dashoffset')
                  path#Shape(d='M42.6907609,20.7503727 C41.2853571,13.6200155 35.0230435,8.26708075 27.5,8.26708075 C21.5270342,8.26708075 16.339441,11.6565839 13.7559783,16.6168323 C7.535,17.2781988 2.69875776,22.5484627 2.69875776,28.9347826 C2.69875776,35.7757919 8.25836957,41.3354037 15.0993789,41.3354037 L41.9673913,41.3354037 C47.671677,41.3354037 52.3012422,36.7058385 52.3012422,31.0015528 C52.3012422,25.5452795 48.0643634,21.1223913 42.6907609,20.7503727 Z M31.6335404,26.8680124 L31.6335404,35.1350932 L23.3664596,35.1350932 L23.3664596,26.8680124 L17.1661491,26.8680124 L27.5,16.5341615 L37.8338509,26.8680124 L31.6335404,26.8680124 Z', fill='#CFD8DC', fill-rule='nonzero')
              br
              .text 上传图片
              input(type='file', id="pickfiles" @click='uploadImg($event)')
        .input-group
          label 参数
          .parameters
            .inputs(v-for='item, index in edited.parameters')
              input(v-model='item.key', placeholder='名称')
              input(v-model='item.value', placeholder='值')
              .remove(@click='removeParameter(index)')
                .material-icon remove
    .edit-footer
      button.btn.save(@click='saveEdited', v-if='!isProduct') 创建宝贝
      button.btn.save(@click='saveEdited', v-if='isProduct') 保存修改

      .btn.add-parameter(@click='addParameter')
        .material-icon add
        | 添加参数

  .float-btn(@click='createProduct')
    .material-icon add
  v-snackbar(:open.sync='openSnackbar')
    span(slot='body') 保存成功
</template>

<script type="text/javascript">
import { mapState } from 'vuex'
import axios from 'axios'
import Uploader from 'qiniu-web-uploader'
import randomToken from 'random-token'
import vSnackbar from '~/components/snackbar'

export default {
  layout: 'admin',
  head() {
    return {
      title: '宝贝列表'
    }
  },
  data () {
    return {
      isProduct: false,
      openSnackbar: false,
      edited: {
        images: [],
        parameters: [],
        title: '',
        price: '',
        intro: ''
      },
      upload: {
        dasharray: 0,
        dashoffset: 0
      },
      editing: false,
      token: '',
    }
  },
  async created() {
    this.$store.dispatch('fetchProducts')
    this.getUptoken()
  },
  computed: mapState([
    'imageCDN',
    'products'
  ]),
  methods: {
    editedIntro(e) {
      let html = e.target.value
      html = html.replace(/\n/, '<br/>')
      this.edited.intro = html
    },
    editProduct(item) {
      this.edited = item
      this.isProduct = true
      this.editing = true
    },
    async deleteProduct(item) {
      await this.$store.dispatch('deleteProduct', item)
    },
    createProduct() {
      this.edited = {
        images: [],
        parameters: [],
        title: '',
        price: '',
        intro: ''
      }
      this.isProduct = false
      this.editing = true
    },
    async saveEdited() {
      this.isProduct
         ? await this.$store.dispatch('putProduct', this.edited)
         : await this.$store.dispatch('saveProduct', this.edited)

      this.openSnackbar = true
      this.isProduct = false
      this.edited = {
        images: [],
        parameters: [],
        title: '',
        price: '',
        intro: ''
      }
      this.editing = !this.editing
    },
    addParameter() {
      this.edited.parameters.push({
        key: '',
        value: ''
      })
    },
    removeParameter(index) {
      this.edited.parameters.splice(index, 1)
    },
    async getUptoken(key) {
      let res = await axios.get('/qiniu/token', {
        params: {
          key
        }
      })
      this.token = res.data.data.token
    },
    async uploadImg(e) {
      console.log(this.token)
      let _this = this
      let uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',    //上传模式,依次退化
        browse_button: 'pickfiles',       //上传选择的点选按钮，**必需**
        uptoken : this.token, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
        unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
        save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
        domain: 'http://oy9al01jo.bkt.clouddn.com/',   //bucket 域名，下载资源时用到，**必需**
        get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
        container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: '100mb',           //最大文件体积限制
        //flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
        max_retries: 3,                   //上传失败最大重试次数
        dragdrop: true,                   //开启可拖曳上传
        drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb',                //分块上传时，每片的体积
        auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
          'FilesAdded': function(up, files) {
              plupload.each(files, function(file) {
                  // 文件添加进队列后,处理相关的事情
                  console.log(file)
              });
          },
          'FileUploaded': function(up, file, info) {
            var domain = up.getOption('domain');
            var res = JSON.parse(info.response);
            var sourceLink = domain + res.key; //获取上传成功后的文件的Url
            _this.edited.images.push(sourceLink)
          },
          'Error': function(up, err, errTip) {
                 //上传出错时,处理相关的事情
                 console.log(err)
          },
          'UploadComplete': function() {
                 //队列文件处理完毕后,处理相关的事情
          }
      }
    });

    uploader.start()

    },
    deleteImg(index) {
      this.edited.images.splice(index, 1)
    }
  },
  components: {
    vSnackbar
  }
}
</script>
<style lang="sass" src="~/static/sass/admin.sass">
</style>
