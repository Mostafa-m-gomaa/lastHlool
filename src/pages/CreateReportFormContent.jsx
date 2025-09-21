import React from "react";
import { FieldArray, Form } from "formik";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import CustomInput from "@/formik/InputForAddReport";
import FormikError from "../formik/FormikError";
import { ErrorMessage } from "formik";

// لاحظ: باقي المكونات مثل DialogDemo أو عمليات المعالجة مثل hasba أو generateOutgoings
// يجب تمريرهم كـ props من EditReport أو CreateReport

const CreateReportFormContent = ({
  values,
  setFieldValue,
  handleSubmit,
  hasbaCheck,
  setHasbaCheck,
  checkOutGoings,
  setCheckOutGoings,
  isEditing = false,
  mutationPending = false,
  hasba,
  generateOutgoings,
  commessions,
  cash,
  cashWithMe,
  commissionInputs,
  handleCommissionChange
}) => {
  return (
    <Form className="w-[80%] mx-auto flex flex-col gap-8">
      <h2 className="text-xl font-bold">ملخص التقرير</h2>

      {/* مثال: حقل التاريخ */}
      <CustomInput type="date" name="reportDate" label="تاريخ التقرير" />

      {/* العمولات */}
      <div className="bg-white flex flex-col gap-10 items-center w-[90%] py-10 px-4 rounded-md shadow-2xl border-2 mx-auto">
        <div className="flex flex-col border-2 border-black p-4 rounded-md gap-2 w-full">
          <h2>العمولات المستحقة</h2>
          <div>{cashWithMe} الصندوق</div>
          <div>{cash} اجمالي المبلغ لهذا التقرير</div>
          <div>{cash + cashWithMe} الاجمالي الكلي:</div>
          {commessions?.map((item, i) =>
            item.userId === undefined ? null : (
              <div className="flex gap-2 w-full justify-between" key={i}>
                <input
                  type="number"
                  className="w-[55%] border p-2 rounded"
                  value={commissionInputs[item.userId] || ""}
                  onChange={(e) => handleCommissionChange(item.userId, e.target.value)}
                />
                <div className="flex w-[40%] justify-between">
                  <div>ر.س {item.userCommission}</div>
                  <div>{item.userName}</div>
                </div>
              </div>
            )
          )}
        </div>

        <Button
          type="button"
          onClick={() => {
            hasba(values);
            setFieldValue("burnOuts", []);
            setFieldValue("userDues", []);
          }}
        >
          الحاسبة
        </Button>

        <CustomInput type="text" name="description" label="الوصف" />
      </div>

      <Button type="button" onClick={generateOutgoings}>
        حساب المخرجات
      </Button>

      <Button type="submit" disabled={mutationPending}>
        {mutationPending ? (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin" />
            {isEditing ? "جاري التعديل..." : "جاري الإنشاء..."}
          </div>
        ) : (
          isEditing ? "تحديث التقرير" : "إنشاء"
        )}
      </Button>
    </Form>
  );
};

export default CreateReportFormContent;
