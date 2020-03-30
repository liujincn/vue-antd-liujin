import Mock from 'mockjs'
const Random = Mock.Random
const server = []
const channel = []
for (let i = 0; i < 10; i++) {
    let template = {
        'id': Random.natural(4),
        'name': Random.ctitle(4)
    }
    server.push(template)
}

for (let i = 0; i < 10; i++) {
    let template = {
        'id': Random.natural(4),
        'name': Random.ctitle(4)
    }
    channel.push(template)
}

export {server,channel}
