<template>
   <q-field ref="fieldRef" dense v-bind:model-value="modelValue" no-error-icon borderless
      :rules="[val => isEmpty ? (!!val && val !== null) || isEmpty : true]" >

  <div class="fileUploader" style="position: relative;">
    <label class="fileInput" for="fileInput" :style="fieldRef && fieldRef.hasError ? 'border-color: #C10015' : ''">
      <q-icon style="color: gray;" :name="icon" size="20px" class="q-px-sm" />
      <input type="file" id="fileInput" @change="uploader" v-bind="$attrs">
    </label>
  </div>

  </q-field>

</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: "File upload"
  },

  icon: {
    type: String,
    default: "cloud_upload"
  },

  modelValue: { },

  isEmpty: {
      type:String,
      default:""
    },

  width: {
    type:Number,
    default: 800
  },

  height: {
    type:Number,
    default:500
  }
});

const emits =  defineEmits(["update:modelValue"]);

const fieldRef = ref(null)

const uploader = (e) => {
  if (e.target.files.length > 1) {
    let files = [];
    for (const file of e.target.files) {
    if (file.size > 1097152) return alert("Rasm hajmi 1 MIB dan oshmasligi lozim!");
    const render = new FileReader();
    const img = new Image();
    render.onload = (eventRender) => {
      img.src = render.result;

//Validate the File Height and Width.
  img.onload = function () {
  const height = this.height;
  const width = this.width;

  if (height <= props.height && width <= props.width) {
    return  files.push(eventRender.target.result);
  }
  e.target.value = "";
  return alert(`Kechirasiz, bu rasm biz xohlagan hajmga o‘xshamaydi. Bu ${img.width} x ${img.height}, lekin bizga ${props.width} x ${props.height} oʻlchamgacha bo'lgan rasm kerak.`);

};
 
}  
    render.readAsDataURL(file);

  }

    emits("update:modelValue", files);

  } else {
    
  if (e.target.files[0].size > 1097152) {
    e.target.value = "";
    return alert("Rasm hajmi 1 MIB dan oshmasligi lozim!");
  };

    const render = new FileReader();
    const img = new Image();
    render.onload = (eventRender) => {
      img.src = render.result;

//Validate the File Height and Width.
  img.onload = function () {
  const height = this.height;
  const width = this.width;

  if (height <= props.height && width <= props.width) {
    return  emits("update:modelValue", eventRender.target.result);
  }
  e.target.value = "";
  return alert(`Kechirasiz, bu rasm biz xohlagan hajmga o‘xshamaydi. Bu ${img.width} x ${img.height}, lekin bizga ${props.width} x ${props.height} oʻlchamgacha bo'lgan rasm kerak.`);

};

}
    render.readAsDataURL(e.target.files[0]);
 
  }
}


</script>

<style lang="scss" scoped>
.fileUploader {
  width: 100%;
  display: flex;
  padding: 3px;
  justify-content: center;

  .fileInput {
    width: 100%;
    padding: 10px 10px;
    border: 1px solid rgb(212, 210, 210);
    border-radius: 3px;
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover {
      border: 1px solid grey;
    }
  }


  input[type=file]::file-selector-button {
    background-color: #fff;
    color: #000;
    border: 0px;
    border-right: 1px solid #e5e5e5;
    transition: .5s;
    display: none;
  }

  input[type=file]::file-selector-button:hover {
    background-color: #eee;
    border: 0px;
    border-right: 1px solid #e5e5e5;
  }

}
</style>
