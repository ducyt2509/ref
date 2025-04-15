
Hãy để tôi phân tích lại dựa trên bảng rules bạn đã cung cấp:
 Từ bảng rules, tôi thấy:
1. Về việc xác định level:
  V1: Cần directly refer 5 members  nhận được 10% từ Tổng  Reward của các con
  V2: Cần directly refer 5 members và total team size ≥ 50 nhận được 20% từ Tổng  Reward của các con
  V3: Cần ít nhất 2 V2 members từ các nhánh referral khác nhau nhận được 30% từ Tổng  Reward của các con
  V4: Cần ít nhất 2 V3 members từ các nhánh referral khác nhau nhận được 40% từ Tổng  Reward của các con
  V5, V6, V7: Tương tự, cần 2 members từ level trước đó tương tự tăng lên theo




Tôi đang có 1 case đã tính sẵn mẫu với kết quả đã đúng
 Mọi người đều stake vào hệ thông là 100 $ Lãi mỗi ngày là 1% User ( đây là giả sử để dễ tính toán còn trường hợp thực tế thì mỗi người stake mỗi số lương khác cũng tương ứng với một mức lãi mỗi ngày khác nhau )
Công thức tính Revenue của từng người = số stake  * lãi mỗi ngày


A2 mời được 6 user: A21, A22, A23,A24,A25,A26
A21-24 đều mời được thêm 10 user
A25 mời được 50 user
A26 mời được thêm 50 (trong đó có A261 mời thêm được 50 user nữa)

Cây có dạng như sau
A2
  - A21 mời thêm 10 người A2101 -> A2110
  - A22 mời thêm 10 người A2201 -> A2210
  - A23 mời thêm 10 người A2301 -> A23310
  - A24 mời thêm 10 người A2401 -> A2410
  - A25 mời thêm 50 người A2501 -> A2550
  - A25 mời thêm 50 người A2601 -> A2650  tuy nhiên có A2601 mời thêm được 50 người nữa  A260101 -> A260150



 công thức tính toán từ các node con lên Như ở đây:
  A2601  = Tổng Revenue của (A260101 -> A260150 ) * 20% (20% là level của A2601 )
  A26 = Tổng Revenue của 49 con (A2602 -> A2650 ) * 20 % + 10% * A261 (vì cùng cấp với A261)
  A25 = Tổng Revenue của 50 con (A2501 -A2550 )* 20%
  A21 = Tổng Revenue của 50 con (A2101 -> A2110 ) * 10% -> tương tự với A22 A23 A24

  Có trường hợp đặc biệt ví dụ như có thêm A27 nếu LV của A27 > A2 thì A2 sẽ không được nhận reward từ A27

  A2 = A21 + A22 +A23 + A24+ A25 + A26
