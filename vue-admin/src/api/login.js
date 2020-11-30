import service from "@/utils/request";

//get SMs
export function GetSms(data) {
  service.request({
    url: "/getSms/",
    method: "post",
    data
  });
  // .then(function(response) {
  //   console.log(response);
  // })
  // .catch(function(error) {
  //   console.log(error);
  // });
}
