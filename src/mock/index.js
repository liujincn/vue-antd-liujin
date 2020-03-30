import Mock from 'mockjs'
import {server} from '@/mock/mockData/options'
Mock.mock('/api/server', (req, res) => {
    return {
        server
    }
})

Mock.setup({
    timeout: 800
});
