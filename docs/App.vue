<template>
    <div id="create">
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { Layout } from '@hanav/configrable'

export default defineComponent({
    setup() {
        onMounted(() => {
            new Layout({
                container: '#create',
                resize: true
            })
        })
    }
})
</script>