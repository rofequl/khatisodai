<template>
  <div>
    <CRow>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon
            header="0"
            text="Category"
            color="gradient-primary"
        >
          <CIcon name="cil-bookmark" width="24"/>
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon
            header="0"
            text="Brands"
            color="gradient-info"
        >
          <CIcon name="cil-bold" width="24"/>
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon
            header="0"
            text="Product"
            color="gradient-warning"
        >
          <CIcon name="cil-3d" width="24"/>
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon
            header="0"
            text="RFQ"
            color="gradient-danger"
        >
          <CIcon name="cil-touch-app" width="24"/>
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon
            header="0"
            text="Customer"
            color="gradient-primary"
        >
          <CIcon name="cil-user" width="24"/>
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon
            header="0"
            text="Pending Orders"
            color="gradient-info"
        >
          <CIcon name="cil-thumb-down" width="24"/>
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon
            header="0"
            text="Total Sales"
            color="gradient-warning"
        >
          <CIcon name="cil-cart" width="24"/>
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon
            header="0"
            text="revenue"
            color="gradient-danger"
        >
          <CIcon name="cil-credit-card" width="24"/>
        </CWidgetIcon>
      </CCol>
    </CRow>
    <CCardGroup columns class="card-columns cols-2">
      <CCard>
        <CCardHeader>Selling Bar Chart</CCardHeader>
        <CCardBody>
          <ChartBar/>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          <strong> Top selling product list </strong>
          <small>all time</small>
          <div class="card-header-actions">
            <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <CIcon name="cil-settings"/>
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">all time</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">this year</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">this month</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </CCardHeader>
        <CCardBody>
          <CListGroup>
            <CListGroupItem
                class="d-flex justify-content-between align-items-center"
            >
              Cras justo odio
              <CBadge color="primary" shape="pill">14</CBadge>
            </CListGroupItem>
            <CListGroupItem
                class="d-flex justify-content-between align-items-center"
            >
              Dapibus ac facilisis in
              <CBadge color="primary" shape="pill">2</CBadge>
            </CListGroupItem>
            <CListGroupItem
                class="d-flex justify-content-between align-items-center"
            >
              Morbi leo risus
              <CBadge color="primary" shape="pill">1</CBadge>
            </CListGroupItem>
            <CListGroupItem
                class="d-flex justify-content-between align-items-center"
            >
              Cras justo odio
              <CBadge color="primary" shape="pill">14</CBadge>
            </CListGroupItem>
            <CListGroupItem
                class="d-flex justify-content-between align-items-center"
            >
              Dapibus ac facilisis in
              <CBadge color="primary" shape="pill">2</CBadge>
            </CListGroupItem>
          </CListGroup>
        </CCardBody>
      </CCard>
    </CCardGroup>
    <UserPurchase/>
  </div>
</template>

<script>
import ChartBar from "@/components/dashboard/ChartBar";
import UserPurchase from "@/components/dashboard/UserPurchase";

export default {
  name: "Dashboard",
  components: {UserPurchase, ChartBar}
}
</script>

<style scoped>

</style>
