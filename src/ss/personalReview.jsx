import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../reference.module.css";
import InfoSection from "../../../components/ReviewCollapsePanel/review";
import { addMasterStatus } from "store/slice/MasterStatus/master-status";
import { notifyError, notifyInfo, notifySuccess } from "components/toastify";applicantDetails
import { formatSSN } from "utils/formatter";
import { localDateFormatDate } from "utils/localDateFormatter";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Stack } from "../../../../node_modules/@mui/material/index";
import moment from "moment";

const PersonalReview = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const IMAGE_URL = process.env.REACT_APP_IMAGE_URL + "Personal/";
  const draftAccounts = useSelector((state) => state.personalAccountOpeningDraft.accounts);
  const completedAccounts = useSelector((state) => state.personalAccountOpeningComplete.accounts);
  const allAccounts = [...draftAccounts, ...completedAccounts];
  const account = allAccounts.find((acc) => acc.accountMaster.id === id);

  if (!account) {
    return <div className={styles.errorMessage}>Account not found</div>;
  }
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmitStatus = async () => {
    if (!status) {
      notifyInfo("Please select a status before submitting.");
      return;
    }

    const data = {
      id: accountMasterInfo?.id,
      status: status
    };

    try {
      const response = await dispatch(addMasterStatus(data)).unwrap();

      if (response) {
        notifySuccess("Status Updated");
        navigate("/reference/account/personal/");
      }
    } catch (error) {
      notifyError("Unable to Update");
    }
  };

  const formatCurrency = (amount) => {
    if (!amount || amount === "N/A") return "N/A";
    const formattedAmount = `$${Number(amount).toLocaleString("en-US")}`;
    return formattedAmount;
  };

  const accountMasterInfo = {
    id: account.accountMaster?.id || "N/A",
    status: account.accountMaster?.status || "N/A",
    referedBy: account.accountMaster?.referedBy || "N/A",
    updatedBy: account.accountMaster?.updatedBy || "N/A",
    applicationCategory: account.accountMaster?.applicationCategory || "N/A",
    applicationType: account.accountMaster?.applicationType || "N/A",
    mobileNumber: account.accountMaster?.mobileNumber || "N/A",
    modifiedDate: localDateFormatDate(account.accountMaster?.modifiedDate || "N/A"),
    createdDate: localDateFormatDate(account.accountMaster?.createdDate || "N/A")
  };
  const accountMasterFields = [
    { label: "Status", key: "status" },
    { label: "Refered By", key: "referedBy" },
    { label: "Updated By", key: "updatedBy" },
    { label: "Application Category", key: "applicationCategory" },
    { label: "Application Type", key: "applicationType" },
    { label: "Mobile Number", key: "mobileNumber" },
    { label: "Modified Date", key: "modifiedDate" },
    { label: "Created Date", key: "createdDate" }
  ];
  const validationQuestionInfo = {
    currentEfcuMember: account.validationQuestion?.currentEfcuMember ? "Yes" : "No",
    efcuAccountNumber: account.validationQuestion?.efcuAccountNumber || "N/A",
    memberOfNRNA: account.validationQuestion?.memberOfNRNA ? "Yes" : "No",
    memberOFANA: account.validationQuestion.memberOFANA ? "Yes" : "No",
    immediateFamily: account.validationQuestion.immediateFamily ? "Yes" : "No",
    nepaliEthnicity: account.validationQuestion.nepaliEthnicity ? "Yes" : "No",
    joinANA: account.validationQuestion.joinANA ? "Yes" : "No"
  };
  const validationFields = [
    { label: "Current EFCU Member", key: "currentEfcuMember" },
    { label: "EFCU Account Number", key: "efcuAccountNumber" },
    { label: "Member of NRNA", key: "memberOfNRNA" },
    { label: "Member of ANA", key: "memberOFANA" },
    { label: "Immediate Family", key: "immediateFamily" },
    { label: "Nepali Ethnicity", key: "nepaliEthnicity" },
    { label: "Join ANA", key: "joinANA" }
  ];

  const applicantDetails = account?.details?.map((detail, index) => ({
    applicant: `Applicant ${index + 1}`,
    personalInfo: {
      firstName: detail?.personalInformation?.firstName || "N/A",
      middleName: detail?.personalInformation?.middleName || "N/A",
      lastName: detail?.personalInformation?.lastName || "N/A",
      suffix: detail?.personalInformation?.suffix || "N/A",
      // branch: account?.accountMaster?.branch || "N/A",
      maritalStatus: detail?.personalInformation?.maritalStatus || "N/A",
      email: detail?.personalInformation?.emailAddress || "N/A",
      dateOfBirth: localDateFormatDate(detail?.personalInformation?.dateOfBirth || "N/A"),
      gender: detail?.personalInformation?.gender || "N/A",
      cellPhone: detail?.personalInformation?.cellPhoneNumber || "N/A",
      homePhone: detail?.personalInformation?.homePhoneNumber || "N/A",
      ssn: formatSSN(detail?.personalInformation?.ssNorITIN || "N/A"),
      usCitizenOrPR: detail?.personalInformation?.usCitizenOrPR ? "Yes" : "No",
      notificationFromIRS: detail?.personalInformation?.notificationFromIRS ? "Yes" : "No",
      keepInformed: detail?.personalInformation?.keepInformed ? "Yes" : "No",
      currentStreetAddress: detail?.personalAddress?.address?.streetAddress || "N/A",
      currentAptSuite: detail?.personalAddress?.address?.aptSuite || "N/A",
      currentCity: detail?.personalAddress?.address?.city || "N/A",
      currentState: detail?.personalAddress?.address?.state || "N/A",
      currentZipCode: detail?.personalAddress?.address?.zipCode || "N/A",
      currentDuration: detail?.personalAddress?.duration || "N/A",

      // Mailing Address
      mailingStreetAddress: detail?.personalAddress?.otherMailingAddress?.streetAddress || "N/A",
      mailingAptSuite: detail?.personalAddress?.otherMailingAddress?.aptSuite || "N/A",
      mailingCity: detail?.personalAddress?.otherMailingAddress?.city || "N/A",
      mailingState: detail?.personalAddress?.otherMailingAddress?.state || "N/A",
      mailingZipCode: detail?.personalAddress?.otherMailingAddress?.zipCode || "N/A",
      mailingPostBoxNumber: detail?.personalAddress?.otherMailingAddress?.postBoxNumber || "N/A",

      // Previous Address
      previousStreetAddress: detail?.personalAddress?.previousAddress?.streetAddress || "N/A",
      previousAptSuite: detail?.personalAddress?.previousAddress?.aptSuite || "N/A",
      previousCity: detail?.personalAddress?.previousAddress?.city || "N/A",
      previousState: detail?.personalAddress?.previousAddress?.state || "N/A",
      previousZipCode: detail?.personalAddress?.previousAddress?.zipCode || "N/A"
      // previousPostBoxNumber: detail?.personalAddress?.previousAddress?.postBoxNumber || "N/A"
    },

    employerInfo: {
      employerName: detail?.employerInformation?.employerName || "N/A",
      jobTitle: detail?.employerInformation?.jobTitle || "N/A",
      incomeType: detail?.employerInformation?.incomeType || "N/A",
      yearsWorked: detail?.employerInformation?.yearsWorked || "N/A",
      monthsWorked: detail?.employerInformation?.monthsWorked || "N/A",
      grossMonthlyIncome: formatCurrency(detail?.employerInformation?.grossMonthlyIncome) || "N/A",
      // Employer Address
      streetAddress: detail?.employerAddress?.streetAddress || "N/A",
      aptSuite: detail?.employerAddress?.aptSuite || "N/A",
      city: detail?.employerAddress?.city || "N/A",
      state: detail?.employerAddress?.state || "N/A",
      zipCode: detail?.employerAddress?.zipCode || "N/A"
    },

    uploadInfo: {
      idType: detail?.identityInformation?.idType || "N/A",
      idNumber: detail?.identityInformation?.idNumber || "N/A",
      issuingCountry: detail?.identityInformation?.issuingCountry || "N/A",
      validVisa: detail?.identityInformation?.validVisa || "N/A",
      visaNumber: detail?.identityInformation?.visaNumber || "N/A",
      state: detail?.identityInformation?.state || "N/A",
      issuedDate: moment(detail?.identityInformation?.issuedDate).isValid()
        ? moment(detail?.identityInformation?.issuedDate).format("YYYY-MM-DD")
        : "N/A",
      expiryDate: moment(detail?.identityInformation?.expiryDate).isValid()
        ? moment(detail?.identityInformation?.expiryDate).format("YYYY-MM-DD")
        : "N/A"
    }
  }));

  const beneficiaryFields = [
    { label: "Beneficiary Number", key: "subCategory", category: "Beneficiary Number Information" },
    { label: "Weightage", key: "weightage", category: "Weightage Information" },
    { label: "First Name", key: "firstName", category: "Personal Information" },
    { label: "Email Address", key: "emailAddress", category: "Contact Information" },
    { label: "Middle Name", key: "middleName", category: "Personal Information" },
    { label: "Last Name", key: "lastName", category: "Personal Information" },
    { label: "Suffix", key: "suffix", category: "Personal Information" },
    { label: "Date of Birth", key: "dateOfBirth", category: "Personal Information" },
    { label: "Gender", key: "gender", category: "Personal Information" },
    { label: "Street Address", key: "streetAddress", category: "Address Information" },
    { label: "Marital Status ", key: "maritalStatus", category: "Personal Information" },
    { label: "Apt / Suite", key: "aptSuite", category: "Address Information" },
    { label: "City", key: "city", category: "Address Information" },
    { label: "State", key: "state", category: "Address Information" },
    { label: "Zip Code", key: "zipCode", category: "Address Information" },
    { label: "Cell Phone", key: "cellPhone", category: "Contact Information" },
    { label: "Home Phone", key: "homePhone", category: "Contact Information" },
    { label: "SSN / ITIN", key: "ssn", category: "Contact Information" }
  ];

  const fundingInfo = {
    minimumShareDeposit: account?.fundingInformation?.minimumShareDeposit || "N/A",
    oneTimeEntranceFee: account?.fundingInformation?.oneTimeEntranceFee || "N/A",
    additionalDeposit: account?.fundingInformation?.additionalDeposit || "N/A",
    anaFee: account?.fundingInformation?.anaFee || "N/A",
    total: account?.fundingInformation?.total || "N/A",
    promoCode: account?.fundingInformation?.promoCode || "N/A"
  };
  const manualACH = {
    accountHolderName: account?.manualACH?.accountHolderName || "N/A",
    financialInstitutionName: account?.manualACH?.financialInstitutionName || "N/A",
    routingName: account?.manualACH?.routingName || "N/A",
    accountNumber: account?.manualACH?.accountNumber || "N/A",
    typeOfAccount: account?.manualACH?.typeOfAccount || "N/A",
    effectiveDate: localDateFormatDate(account?.manualACH?.effectiveDate) || "N/A",
    totalDebitAmount: account?.manualACH?.totalDebitAmount || "N/A",
    paymentMode: account?.paymentMode || "N/A",
    transactionId: account?.transactionId || "N/A",
    isPaymentCompleted: account?.isPaymentCompleted ? "Yes" : "No"
  };

  const fundingFields = [
    { label: "Minimum Share Deposit", key: "minimumShareDeposit" },
    { label: "One Time Entrance Fee", key: "oneTimeEntranceFee" },
    { label: "Additional Deposit", key: "additionalDeposit" },
    { label: "ANA Fee", key: "anaFee" },
    { label: "Promo Code", key: "promoCode" },
    { label: "Total", key: "total" }
  ];

  const manualACHField = [
    { label: "Account Holder Name", key: "accountHolderName" },
    { label: "Financial Institution Name", key: "financialInstitutionName" },
    { label: "Routing Name", key: "routingName" },
    { label: "Account Number", key: "accountNumber" },
    { label: "Type of Account", key: "typeOfAccount" },
    { label: "Effective Date", key: "effectiveDate" },
    { label: "Total Debit Amount", key: "totalDebitAmount" },
    { label: "Payment Mode", key: "paymentMode" },
    { label: "Transaction ID", key: "transactionId" },
    { label: "Payment Completed", key: "isPaymentCompleted" }
  ];

  const addressFields = [
    { label: "Street Address", key: "currentStreetAddress", category: "Current Address" },
    { label: "Apt / Suite", key: "currentAptSuite", category: "Current Address" },
    { label: "City", key: "currentCity", category: "Current Address" },
    { label: "State", key: "currentState", category: "Current Address" },
    { label: "Zip Code", key: "currentZipCode", category: "Current Address" },
    { label: "Duration", key: "currentDuration", category: "Current Address" },

    // Mailing Address
    { label: "Street Address", key: "mailingStreetAddress", category: "Mailing Address" },
    { label: "Apt / Suite", key: "mailingAptSuite", category: "Mailing Address" },
    { label: "City", key: "mailingCity", category: "Mailing Address" },
    { label: "State", key: "mailingState", category: "Mailing Address" },
    { label: "Zip Code", key: "mailingZipCode", category: "Mailing Address" },
    { label: "Post Box Number", key: "mailingPostBoxNumber", category: "Mailing Address" },

    // Previous Address
    { label: "Street Address", key: "previousStreetAddress", category: "Previous Address" },
    { label: "Apt / Suite", key: "previousAptSuite", category: "Previous Address" },
    { label: "City", key: "previousCity", category: "Previous Address" },
    { label: "State", key: "previousState", category: "Previous Address" },
    { label: "Zip Code", key: "previousZipCode", category: "Previous Address" }
  ];

  const personalFields = [
    { label: "First Name", key: "firstName", category: "Personal Information" },
    { label: "Middle Name", key: "middleName", category: "Personal Information" },
    { label: "Last Name", key: "lastName", category: "Personal Information" },
    { label: "Suffix", key: "suffix", category: "Personal Information" },
    { label: "Email Address", key: "email", category: "Contact Information" },
    { label: "Date of Birth", key: "dateOfBirth", category: "Personal Information" },
    { label: "Gender", key: "gender", category: "Personal Information" },
    { label: "Marital Status", key: "maritalStatus", category: "Personal Information" },
    { label: "Cell Phone", key: "cellPhone", category: "Contact Information" },
    { label: "Home Phone", key: "homePhone", category: "Contact Information" },
    { label: "SSN / ITIN", key: "ssn", category: "Social Security Number / ITIN Number" },
    { label: "UsCitizen Or PR", key: "usCitizenOrPR", category: "Other Information" },
    { label: "NotificationFromIRS ", key: "notificationFromIRS", category: "Other Information" },
    { label: "KeepInformed ", key: "keepInformed", category: "Other Information" },
    ...addressFields
  ];

  const employerFields = [
    { label: "Employer Name", key: "employerName" },
    { label: "Job Title", key: "jobTitle" },
    { label: "Income Type", key: "incomeType" },
    { label: "Gross Income", key: "grossMonthlyIncome" },
    { label: "YearsWorked", key: "yearsWorked" },
    { label: "MonthsWorked", key: "monthsWorked" },
    { label: "Street Address", key: "streetAddress" },
    { label: "Apt / Suite", key: "aptSuite" },
    { label: "City", key: "city" },
    { label: "State", key: "state" },
    { label: "Zip Code", key: "zipCode" }
  ];

  const applicantBeneficiaries =
    account?.details?.flatMap(
      (detail, applicantIndex) =>
        detail?.beneficiaries?.map((beneficiary, beneficiaryIndex) => ({
          category: `${applicantIndex === 0 ? "Primary" : "Joint"} Applicant's Beneficiary`,
          subCategory: `Beneficiary ${beneficiaryIndex + 1}`,
          weightage: beneficiary?.weightage || "N/A",
          firstName: beneficiary?.personalInformation?.firstName || "N/A",
          middleName: beneficiary?.personalInformation?.middleName || "N/A",
          lastName: beneficiary?.personalInformation?.lastName || "N/A",
          suffix: beneficiary?.personalInformation?.suffix || "N/A",
          dateOfBirth: localDateFormatDate(beneficiary?.personalInformation?.dateOfBirth || "N/A"),
          gender: beneficiary?.personalInformation?.gender || "N/A",
          maritalStatus: beneficiary?.personalInformation?.maritalStatus || "N/A",
          streetAddress: beneficiary?.address?.streetAddress || "N/A",
          emailAddress: beneficiary?.personalInformation?.emailAddress || "N/A",
          aptSuite: beneficiary?.address?.aptSuite || "N/A",
          city: beneficiary?.address?.city || "N/A",
          state: beneficiary?.address?.state || "N/A",
          zipCode: beneficiary?.address?.zipCode || "N/A",
          cellPhone: beneficiary?.personalInformation?.cellPhoneNumber || "N/A",
          homePhone: beneficiary?.personalInformation?.homePhoneNumber || "N/A",
          ssn: formatSSN(beneficiary?.personalInformation?.ssNorITIN) || "N/A"
        })) || []
    ) || [];

  const idInformationFields = [
    { label: "ID Type ", key: "idType", category: "Document Informations" },
    { label: "ID Number", key: "idNumber", category: "Document Informations" },
    { label: "Issuing Country", key: "issuingCountry", category: "Document Informations" },
    { label: "Valid Visa", key: "validVisa", category: "Document Informations" },
    { label: "Visa Number", key: "visaNumber", category: "Document Informations" },
    { label: "State", key: "state", category: "Document Informations" },
    { label: "Issued Date", key: "issuedDate", category: "Document Informations" },
    { label: "Expiry Date", key: "expiryDate", category: "Document Informations" }
  ];

  // const applicantUploads =
  //   account?.details?.[0]?.identityInformation?.governmentIds?.length || account?.details?.identityInformation?.passports?.length
  //     ? [
  //         {
  //           title: "Valid Government Id  - Uploads Information",
  //           data:
  //             account?.details?.[0]?.identityInformation?.governmentIds?.map((doc, index) => ({
  //               fileName: `Applicant ${index + 1} - Visa Documents ${index + 1}`,
  //               url: doc.url
  //             })) || []
  //         },
  //         {
  //           title: "Valid  Passport - Uploads Information",
  //           data:
  //             account?.details?.[0]?.identityInformation?.passports?.map((doc, index) => ({
  //               fileName: `Applicant ${index + 1} -  Passports ${index + 1}`,
  //               url: doc.url
  //             })) || []
  //         },
  //         {
  //           title: "Valid Government Id  - Uploads Information",
  //           data:
  //             account?.details?.[1]?.identityInformation?.governmentIds?.map((doc, index) => ({
  //               fileName: `Applicant ${index + 1} - Visa Documents ${index + 1}`,
  //               url: doc.url
  //             })) || []
  //         },
  //         {
  //           title: "Valid  Passport - Uploads Information",
  //           data:
  //             account?.details?.[1]?.identityInformation?.passports?.map((doc, index) => ({
  //               fileName: `Applicant ${index + 1} -  Passports ${index + 1}`,
  //               url: doc.url
  //             })) || []
  //         }
  //       ]
  //     : [];

  const applicantUploads = account?.details?.some(
    (detail) =>
      detail.identityInformation?.governmentIds?.length ||
      detail.identityInformation?.passports?.length ||
      detail.identityInformation?.visaDocuments?.length
  )
    ? [
        {
          title: "Valid Government Id  - Uploads Information",
          data: account?.details?.flatMap(
            (detail, index) =>
              detail.identityInformation?.governmentIds?.map((doc, docIndex) => ({
                fileName: `Applicant ${index + 1} - Visa Documents ${docIndex + 1}`,
                url: doc.url
              })) || []
          )
        },
        {
          title: "Valid  Passport - Uploads Information",
          data: account?.details?.flatMap(
            (detail, index) =>
              detail.identityInformation?.passports?.map((doc, docIndex) => ({
                fileName: `Applicant ${index + 1} -  Passports ${docIndex + 1}`,
                url: doc.url
              })) || []
          )
        },
        {
          title: "Valid Visa - Uploads Information",
          data: account?.details?.flatMap(
            (detail, index) =>
              detail.identityInformation?.visaDocuments?.map((doc, docIndex) => ({
                fileName: `Applicant ${index + 1} - Visa Documents ${docIndex + 1}`,
                url: doc.url
              })) || []
          )
        }
      ]
    : [];

  return (
    <div
      className={styles.profileSummaryContainer}
      style={{
        maxHeight: "80vh",
        overflowY: "auto",
        paddingRight: "10px",
        paddingBottom: "100px"
      }}
    >
      <div className={styles.formTitleHeader}>Account Opening - Personal</div>

      <div className={styles.spacingLine}></div>
      <div className={styles.innerContent}>
        <div className={styles.subTitile}>Please review the information below</div>
        <Button
          variant="text"
          size="small"
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => navigate(-1)}
          style={{
            color: "var(--primary-color)",
            textTransform: "none",
            fontWeight: 600,
            padding: "10px 20px",
            width: "10px"
          }}
        >
          Back
        </Button>
        {props.type === "completed" && (
          <Stack direction="row" justifyContent="center" mb={3}>
            <div
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "10px 20px",
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#FAFAFA"
              }}
            >
              <div className="flex flex-col gap-2">
                <span className="font-bold">Update Status</span>
                <div className="">
                  <select
                    id="statusSelect"
                    value={status}
                    onChange={handleStatusChange}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 text-sm mb-4 mr-4"
                  >
                    <option value="" disabled>
                      Select a status
                    </option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                  </select>
                  <button
                    onClick={handleSubmitStatus}
                    className="w-auto inline-block px-2 py-1 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none text-sm "
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Stack>
        )}
        <InfoSection title="Account Master Information" data={accountMasterInfo} fields={accountMasterFields} defaultActiveKey={"1"} />
        <InfoSection title="Validation Question Information" data={validationQuestionInfo} fields={validationFields} />
        <InfoSection
          title="Personal Information"
          isArray={true}
          data={applicantDetails?.map((applicant) => ({
            ...applicant.personalInfo,
            category: applicant.applicant === "Applicant 1" ? "Primary Applicant Information" : "Joint Applicant Information"
          }))}
          fields={personalFields}
        />
        <InfoSection
          title="Employer Information"
          isArray={true}
          data={applicantDetails?.map((applicant) => ({
            ...applicant.employerInfo,
            category:
              applicant.applicant === "Applicant 1" ? "Primary Applicant Employer Information" : "Joint Applicant Employer Information"
          }))}
          fields={employerFields}
        />
        {applicantBeneficiaries?.length > 0 && (
          <InfoSection title="Beneficiaries" isArray={true} data={applicantBeneficiaries} fields={beneficiaryFields} />
        )}
        {account?.fundingInformation && <InfoSection title="Funding Information" data={fundingInfo} fields={fundingFields} />}
        {account?.manualACH && <InfoSection title="ManualACH Information" data={manualACH} fields={manualACHField} />}

        <InfoSection
          title="Upload Information"
          isArray={true}
          data={
            account.loanMaster?.applicationType === "Co-Applicant"
              ? applicantDetails.map((applicant) => ({
                  ...applicant.uploadInfo,
                  title: applicant.applicant
                }))
              : applicantDetails.map((applicant) => ({
                  ...applicant.uploadInfo,
                  title: applicant.applicant
                }))[0]
          }
          fields={idInformationFields}
        />
        {applicantUploads?.map(
          (uploads, index) =>
            uploads.data.length > 0 && (
              <InfoSection
                key={`uploads-personal-${index}`}
                title={uploads.title}
                data={uploads.data}
                fields={[
                  { label: "File Name", key: "fileName" },
                  { label: "Document URL", key: "url" }
                ]}
                isArray={true}
                isImageSection={true}
                isImageUrl={true}
                baseUrl={IMAGE_URL}
              />
            )
        )}
      </div>
    </div>
  );
};

export default PersonalReview;
