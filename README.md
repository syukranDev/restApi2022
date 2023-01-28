# restApi2022

For APIs testing, kindly ignore these: <br>
GET: /app/portal/activity/list <br>
POST: /app/portal/activity/filter <br>

Dump api: <br>
POST: /app/portal/activity/statistic <br>


npm i  <br>
cd /services/activity  <br>
set NODE_ENV=dev <br>
node index.js <br>

Addition: <br>
-winston for logger <br>
-joi for validation post req body <br>

Result: <br>
[1] POST: Filter
<p align="left">
  <img src="https://raw.githubusercontent.com/syukranDev/restApi2022/main/images/filter.PNG" />
  </p> <br /> 
  
  <p align="left">
  <img src="https://raw.githubusercontent.com/syukranDev/restApi2022/main/images/filter_2.PNG" />
  </p> <br /> 
 [2] List Post + total comment 
  <p align="left">
  <img src="https://raw.githubusercontent.com/syukranDev/restApi2022/main/images/listPostAndComments.PNG" />
  </p> <br /> 
