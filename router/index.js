module.exports = [
    {
        _html: 'index',
        title: '首页',
        chunks: ['index'] // 页面用到的vendor模块
    },
    {
        _html: 'school',
        title: '学校介绍',
        chunks: ['school']
    },
    {
        _html: 'jidi',
        title: '培训基地',
        chunks: ['jidi']
    },
    {
        _html: 'news',
        title: '新闻资讯',
        chunks: ['news']
    },
    {
        _html: 'newsDetail',
        title: '新闻资讯-详情页',
        chunks: ['newsDetail']
    },
    {
        _html: 'media',
        title: '媒体介绍',
        chunks: ['media']
    },
    {
        _html: 'concat',
        title: '联系我们',
        chunks: ['concat']
    }
];