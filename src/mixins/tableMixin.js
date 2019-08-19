export const tableMixin = {
  data() {
    return {
      // 表格数据
      tableSource: [],
      // 表格数据总数
      tablePageTotal: 0,
      // 分页数据
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 40, 60, 100]
      },
      // 多选数据
      tableMultipleSelection: [],
      // 数据前缀
      tablePrefix: '',
      // 请求接口
      tableUrl: '',
      // 搜索数据
      tableSearch: '',
      // 表格高度
      tableHeight: null
    }
  },
  created() { },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.tablewrap) {
        let tableHeight = this.$refs.tablewrap.clientHeight;
        this.tableHeight = tableHeight;
      }
    });
  },
  methods: {
    // 加载数据
    async initTableData(url, type) {
      this.tableSource = [];
      let data = []
      if (url.includes('?')) {
        data = await this.$get(`${url}&page=${this.tablePage.currentPage}&limit=${this.tablePage.pageSize}`);
      } else {
        data = await this.$get(`${url}?page=${this.tablePage.currentPage}&limit=${this.tablePage.pageSize}`);
      }
      this.tableSource = data.data[type].list
      this.tablePageTotal = data.data[type].total
      this.tablePrefix = type
      this.tableUrl = url
      this.tableSearch = ''
      this.$set(this.tablePage, 'currentPage', 1)
      this.$set(this.tablePage, 'pageSize', 10)
    },
    // 搜索表格数据
    async tableSearchData(obj) {
      this.$set(this.tablePage, 'currentPage', 1)
      this.$set(this.tablePage, 'pageSize', 10)
      let str = '';
      let num = 0;
      for (let value of Object.values(obj)) {
        if (str != "") str += num % 2 == 0 ? "&" : "";
        str += `${value}`;
        str += num % 2 == 0 ? "=" : "";
        num++;
      }
      let data = []
      if (this.tableUrl.includes('?')) {
        data = await this.$get(`${this.tableUrl}&${str}&page=1&limit=10`);
      } else {
        data = await this.$get(`${this.tableUrl}?${str}&page=1&limit=10`);
      }
      this.tableSource = data.data[this.tablePrefix].list
      this.tablePageTotal = data.data[this.tablePrefix].total
      this.tableSearch = str
    },
    // 切换条数
    async tableHandleSizeChange(val) {
      this.$set(this.tablePage, 'pageSize', val)
      this.$set(this.tablePage, 'currentPage', 1)
      let data = []
      if (this.tableUrl.includes('?')) {
        let url = this.tableSearch !== '' ? `${this.tableUrl}&${this.tableSearch}&` : `${this.tableUrl}&`
        data = data = await this.$get(`${url}page=1&limit=${val}`);
      } else {
        let url = this.tableSearch !== '' ? `${this.tableUrl}?${this.tableSearch}&` : `${this.tableUrl}?`
        data = data = await this.$get(`${url}page=1&limit=${val}`);
      }
      this.tableSource = data.data[this.tablePrefix].list
    },
    // 切换页码
    async tableHandleCurrentChange(val) {
      this.$set(this.tablePage, 'currentPage', val)
      let data = []
      if (this.tableUrl.includes('?')) {
        let url = this.tableSearch !== '' ? `${this.tableUrl}&${this.tableSearch}&` : `${this.tableUrl}&`
        data = data = await this.$get(`${url}page=${val}&limit=${this.tablePage.pageSize}`);
      } else {
        let url = this.tableSearch !== '' ? `${this.tableUrl}?${this.tableSearch}&` : `${this.tableUrl}?`
        data = data = await this.$get(`${url}page=${val}&limit=${this.tablePage.pageSize}`);
      }
      this.tableSource = data.data[this.tablePrefix].list
    },
    // 多选
    tableHandleSelectionChange(val) {
      this.tableMultipleSelection = val
    },
    // 表格变色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return 'background:#eff3f6; color:#333333; font-size:14px;'
      } else {
        return 'color:#666666; font-size:14px;'
      }
    }
  }
}
