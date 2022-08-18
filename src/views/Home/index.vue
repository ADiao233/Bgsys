<template>
<!-- 采用Layout布局 -->
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间<span>2022-0719</span></p>
          <p>上次登陆地点<span>江西</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px" shadow="hover">
        <el-table :data="tableData" style="width: 100%" height="300">
          <el-table-column prop="name" label="品牌"> </el-table-column>
          <el-table-column prop="todayBuy" label="日销量"> </el-table-column>
          <el-table-column prop="monthBuy" label="月销量"> </el-table-column>
          <el-table-column prop="totalBuy" label="总销量"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 240px">
        <!-- <div style="height: 240px" ref="echarts"></div> -->
        <echarts style="height: 240px" :chartData="echartData.order"></echarts>
      </el-card>
      <div class="graph">
        <el-card style="height: 195px">
          <echarts style="height: 195px" :chartData="echartData.user"></echarts>
        </el-card>
        <el-card style="height: 195px">
          <echarts
            style="height: 195px"
            :chartData="echartData.video"
            :isAxisChart="false"
          ></echarts>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getHome } from "../../../api/data";
import echarts from "../../components/ECharts";

export default {
  name: "home",
  components: { echarts },
  data() {
    return {
      userImg: require("../../assets/images/user.png"),
      //左下表格数据
      tableData: [],
      //右上标签数据
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      //图表数据
      echartData: {
        order: { xData: [], series: [] },
        user: { xData: [], series: [] },
        video: { series: [] },
      },
    };
  },
  mounted() {
    //发送请求图表数据
    getHome().then((res) => {
      const { code, data } = res;
      if (code == 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: data.orderData.data.map((item) => item[key]),
            type: "line",
          });
        });
        this.echartData.order.series = series;
        this.echartData.order.xData = order.date;
        //柱状图配置
        this.echartData.user.series = [
          {
            name: "新增客户",
            data: data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "旧客户",
            data: data.userData.map((item) => item.active),
            type: "bar",
          },
        ];
        this.echartData.user.xData = data.userData.map((item) => item.date);
        //饼图配置
        this.echartData.video.series = [
          {
            data: data.videoData,
            type: "pie",
          },
        ];
      }
    });
  },
};
</script>

<style scoped lang="css"></style>
