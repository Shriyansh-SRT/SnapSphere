import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../reference.module.css";
import InfoSection from "../../../components/ReviewCollapsePanel/review";
import { addMasterStatus } from "store/slice/MasterStatus/master-status";
import { notifyError, notifyInfo, notifySuccess } from "components/toastify";
import { localDateFormatDate } from "utils/localDateFormatter";
import { formatSSN } from "utils/formatter";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Stack } from "../../../../node_modules/@mui/material/index";

const BusinessReview = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const IMAGE_URL = process.env.REACT_APP_IMAGE_URL + "Business/";
  const draftAccounts = useSelector((state) => state.businessAccountOpeningDraft.accounts);
  const completedAccounts = useSelector((state) => state.businessAccountOpeningComplete.accounts);
  const allAccounts = [...draftAccounts, ...completedAccounts];
  const account = allAccounts.find((acc) => acc.accountMaster?.id === id);

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
      console.log(response, "response.........");

      if (response) {
        notifySuccess("Status Updated");
        navigate("/reference/account/business/");
      }
    } catch (error) {
      notifyError("Unable to Update");
    }
  };

  // Account Master Information
  const accountMasterInfo = {
    id: account.accountMaster?.id || "N/A",
    status: account.accountMaster?.status || "N/A",
    applicationCategory: account.accountMaster?.applicationCategory || "N/A",
    applicationType: account.accountMaster?.applicationType || "N/A",
    mobileNumber: account.accountMaster?.mobileNumber || "N/A",
    modifiedDate: localDateFormatDate(account.accountMaster?.modifiedDate) || "N/A"
  };

  const accountMasterFields = [
    { label: "Status", key: "status" },
    { label: "Application Category", key: "applicationCategory" },
    { label: "Application Type", key: "applicationType" },
    { label: "Mobile Number", key: "mobileNumber" },
    { label: "Modified Date", key: "modifiedDate" }
  ];

  console.log(account, "sss");
  // Validation Questions
  const validationQuestions = {
    currentEfcuMember: account.validationQuestion?.currentEfcuMember ? "Yes" : "No",
    legalAuthorized: account.validationQuestion?.legalAuthorized ? "Yes" : "No",
    numberOfBusinessOwners: account.validationQuestion?.numberOfBusinessOwners || "N/A",
    efcuAccountNumber: account.validationQuestion?.efcuAccountNumber || "N/A",
    licenseFiles: account.validationQuestion?.licenseFiles?.map((file) => file.fileName).join(", ") || "None"
  };

  const validationFields = [
    { label: "Are you a current EFCU Member?", key: "currentEfcuMember" },
    { label: "EFCU Account Number", key: "efcuAccountNumber" },
    { label: "Are you legally authorized to handle banking on behalf of this company?", key: "legalAuthorized" },
    { label: "License Files", key: "licenseFiles" },
    { label: "Number of Business Owners", key: "numberOfBusinessOwners" }
  ];

  // Business Address
  const businessAddress = {
    streetAddress: account.businessAddrss?.streetAddress || "N/A",
    aptSuite: account.businessAddrss?.aptSuite || "N/A",
    city: account.businessAddrss?.city || "N/A",
    state: account.businessAddrss?.state || "N/A",
    zipCode: account.businessAddrss?.zipCode || "N/A"
  };

  // Business Information
  const businessInfo = {
    name: account.businessInformation?.name || "N/A",
    businessEntityType: account.businessInformation?.businessEntityType || "N/A",
    businessType: account.businessInformation?.businessType || "N/A",
    ein: account.businessInformation?.ein || "N/A",
    website: account.businessInformation?.website || "N/A",
    establishedDate: localDateFormatDate(account.businessInformation?.establishedDate || "N/A"),
    email: account.businessInformation?.emailAddress || "N/A",
    cellPhoneNumber: account.businessInformation?.cellPhoneNumber || "N/A",
    officePhoneNumber: account.businessInformation?.officePhoneNumber || "N/A",
    extension: account.businessInformation?.extension || "N/A",
    purposeOfBusiness: account.businessInformation?.purposeOfBusiness || "N/A",
    engageInInternetGambling: account.businessInformation?.engageInInternetGambling ? "Yes" : "No",
    involvedInMarijuanaProducts: account.businessInformation?.involvedInMarijuanaProducts ? "Yes" : "No",
    isIncorporatedOutsideUS: account.businessInformation?.isIncorporatedOutsideUS ? "Yes" : "No",
    isMoneyServiceBusiness: account.businessInformation?.isMoneyServiceBusiness ? "Yes" : "No",
    willCashChecksForCustomers: account.businessInformation?.willCashChecksForCustomers ? "Yes" : "No",
    ...businessAddress
  };

  const businessAddressFields = [
    { label: "Address", key: "streetAddress", category: "Business Address Information" },
    { label: "Apt/Suite", key: "aptSuite", category: "Business Address Information" },
    { label: "City", key: "city", category: "Business Address Information" },
    { label: "State", key: "state", category: "Business Address Information" },
    { label: "Zip Code", key: "zipCode", category: "Business Address Information" }
  ];

  const businessFields = [
    { label: "Business Name", key: "name", category: "Business Information" },
    { label: "Entity Type", key: "businessEntityType", category: "Business Information" },
    { label: "Business Type", key: "businessType", category: "Business Information" },
    { label: "EIN", key: "ein", category: "Business Information" },
    { label: "Website", key: "website", category: "Business Information" },
    { label: "Established Date", key: "establishedDate", category: "Business Information" },
    { label: "Email", key: "email", category: "Business Contact Information" },
    { label: "Cell Phone", key: "cellPhoneNumber", category: "Business Contact Information" },
    { label: "Office Phone", key: "officePhoneNumber", category: "Business Contact Information" },
    { label: "Extension", key: "extension", category: "Business Contact Information" },
    ...businessAddressFields,
    { label: "The Nature and Purpose of Business", key: "purposeOfBusiness", category: "Other Information" },
    { label: "Incorporated Outside US", key: "isIncorporatedOutsideUS", category: "Other Information" },
    { label: "Will Cash Checks for Customers", key: "willCashChecksForCustomers", category: "Other Information" }
  ];

  // Manual ACH
  const manualACH = account.manualACH
    ? {
        accountHolderName: account.manualACH?.accountHolderName || "N/A",
        financialInstitutionName: account.manualACH?.financialInstitutionName || "N/A",
        routingNumber: account.manualACH?.routingNumber || "N/A",
        accountNumber: account.manualACH?.accountNumber || "N/A",
        typeOfAccount: account.manualACH?.typeOfAccount || "N/A",
        effectiveDate: localDateFormatDate(account.manualACH?.effectiveDate || "N/A"),
        totalDebitAmount: account.manualACH?.totalDebitAmount || "N/A"
      }
    : null;

  const manualACHFields = manualACH
    ? [
        { label: "Account Holder Name", key: "accountHolderName", category: "Manual ACH Information" },
        { label: "Financial Institution Name", key: "financialInstitutionName", category: "Manual ACH Information" },
        { label: "Routing Number", key: "routingNumber", category: "Manual ACH Information" },
        { label: "Account Number", key: "accountNumber", category: "Manual ACH Information" },
        { label: "Type of Account", key: "typeOfAccount", category: "Manual ACH Information" },
        { label: "Effective Date", key: "effectiveDate", category: "Manual ACH Information" },
        { label: "Total Debit Amount", key: "totalDebitAmount", category: "Manual ACH Information" }
      ]
    : [];

  // Funding Information
  const fundingInfo = account.fundingInformation
    ? {
        minimumShareDeposit: account.fundingInformation?.minimumShareDeposit || "N/A",
        oneTimeEntranceFee: account.fundingInformation?.oneTimeEntranceFee || "N/A",
        additionalDeposit: account.fundingInformation?.additionalDeposit || "N/A",
        promoCode: account.fundingInformation?.promoCode || "N/A",
        total: account.fundingInformation?.total || "N/A"
      }
    : null;

  const fundingFields = fundingInfo
    ? [
        { label: "Minimum Share Deposit", key: "minimumShareDeposit" },
        { label: "One Time Entrance Fee", key: "oneTimeEntranceFee" },
        { label: "Additional Deposit", key: "additionalDeposit" },
        { label: "Promo Code", key: "promoCode" },
        { label: "Total", key: "total" }
      ]
    : [];
  // Authorized Signer Information

  console.log(account, "account.authorizedSigners");

  const coSignerInfo =
    account.authorisedSigners?.map((signer) => ({
      fullName: `${signer.personalInformation?.firstName || "N/A"} ${signer.personalInformation?.middleName || "N/A"} ${signer.personalInformation?.lastName || "N/A"}`,
      suffix: signer.personalInformation?.suffix || "N/A",
      dateOfBirth: localDateFormatDate(signer.personalInformation?.dateOfBirth || "N/A"),
      gender: signer.personalInformation?.gender || "N/A",
      maritalStatus: signer.personalInformation?.maritalStatus || "N/A",
      email: signer.personalInformation?.emailAddress || "N/A",
      cellPhone: signer.personalInformation?.cellPhoneNumber || "N/A",
      homePhone: signer.personalInformation?.homePhoneNumber || "N/A",
      ssn: formatSSN(signer.personalInformation?.ssNorITIN || "N/A"),
      usCitizenOrPR: signer.personalInformation?.usCitizenOrPR ? "Yes" : "No",
      notificationFromIRS: signer.personalInformation?.notificationFromIRS ? "Yes" : "No",
      branch: account.accountMaster?.branch || "N/A",
      keepInformed: signer?.personalInformation?.keepInformed ? "Yes" : "No",

      // Current Address
      currentStreetAddress: signer.personalAddress?.address?.streetAddress || "N/A",
      currentAptSuite: signer.personalAddress?.address?.aptSuite || "N/A",
      currentCity: signer.personalAddress?.address?.city || "N/A",
      currentState: signer.personalAddress?.address?.state || "N/A",
      currentZipCode: signer.personalAddress?.address?.zipCode || "N/A",
      currentDuration: signer.personalAddress?.duration || "N/A",

      // Previous Address
      previousStreetAddress: signer.personalAddress?.previousAddress?.streetAddress || "N/A",
      previousAptSuite: signer.personalAddress?.previousAddress?.aptSuite || "N/A",
      previousCity: signer.personalAddress?.previousAddress?.city || "N/A",
      previousState: signer.personalAddress?.previousAddress?.state || "N/A",
      previousZipCode: signer.personalAddress?.previousAddress?.zipCode || "N/A",
      // previousPostBoxNumber: signer.personalAddress?.previousAddress?.postBoxNumber || "N/A",

      // Mailing Address
      mailingStreetAddress: signer.personalAddress?.otherMailingAddress?.streetAddress || "N/A",
      mailingAptSuite: signer.personalAddress?.otherMailingAddress?.aptSuite || "N/A",
      mailingCity: signer.personalAddress?.otherMailingAddress?.city || "N/A",
      mailingState: signer.personalAddress?.otherMailingAddress?.state || "N/A",
      mailingZipCode: signer.personalAddress?.otherMailingAddress?.zipCode || "N/A",
      mailingPostBoxNumber: signer.personalAddress?.otherMailingAddress?.postBoxNumber || "N/A"
    })) || [];

  const coSignerFields = [
    { label: "Full Name", key: "fullName", category: "Personal Information" },
    { label: "Suffix", key: "suffix", category: "Personal Information" },
    { label: "Date of Birth", key: "dateOfBirth", category: "Personal Information" },
    { label: "Gender", key: "gender", category: "Personal Information" },
    { label: "Marital Status", key: "maritalStatus", category: "Personal Information" },
    { label: "Email Address", key: "email", category: "Contact Information" },
    { label: "Cell Phone", key: "cellPhone", category: "Contact Information" },
    { label: "Home Phone", key: "homePhone", category: "Contact Information" },
    { label: "SSN / ITIN", key: "ssn", category: "Social Security Number / ITIN Number" },
    { label: "Branch", key: "branch", category: "Other Information" },
    { label: "U.S. Citizen or Permanent Resident", key: "usCitizenOrPR", category: "Other Information" },
    { label: "Notification from IRS", key: "notificationFromIRS", category: "Other Information" },
    { label: "KeepInformed ", key: "keepInformed", category: "Other Information" },

    // current address
    { label: "Street Address", key: "currentStreetAddress", category: "Current Address" },
    { label: "Apt / Suite", key: "currentAptSuite", category: "Current Address" },
    { label: "City", key: "currentCity", category: "Current Address" },
    { label: "State", key: "currentState", category: "Current Address" },
    { label: "Zip Code", key: "currentZipCode", category: "Current Address" },
    { label: "Duration", key: "currentDuration", category: "Current Address" },

    // Previous Address
    { label: "Street Address", key: "previousStreetAddress", category: "Previous Address" },
    { label: "Apt / Suite", key: "previousAptSuite", category: "Previous Address" },
    { label: "City", key: "previousCity", category: "Previous Address" },
    { label: "State", key: "previousState", category: "Previous Address" },
    { label: "Zip Code", key: "previousZipCode", category: "Previous Address" },
    // { label: "Post Box Number", key: "previousPostBoxNumber", category: "Previous Address" },

    // Mailing Address
    { label: "Street Address", key: "mailingStreetAddress", category: "Mailing Address" },
    { label: "Apt / Suite", key: "mailingAptSuite", category: "Mailing Address" },
    { label: "City", key: "mailingCity", category: "Mailing Address" },
    { label: "State", key: "mailingState", category: "Mailing Address" },
    { label: "Zip Code", key: "mailingZipCode", category: "Mailing Address" },
    { label: "Post Box Number", key: "mailingPostBoxNumber", category: "Mailing Address" }
  ];

  // Business Owners

  console.log(account.businessOwner, "account.businessOwner");

  const businessOwners =
    account.businessOwner
      ?.map((owner) => ({
        fullName:
          `${owner.personalInformation?.firstName || "N/A"} ${owner.personalInformation?.middleName || ""} ${owner.personalInformation?.lastName || "N/A"}`.trim(),
        weightage: owner.weightage ? `${owner.weightage}%` : "N/A",
        dob: localDateFormatDate(owner.personalInformation?.dateOfBirth || "N/A"),
        email: owner.personalInformation?.emailAddress || "N/A",
        phone: owner.personalInformation?.cellPhoneNumber || "N/A",
        suffix: owner.personalInformation?.suffix || "N/A",
        gender: owner.personalInformation?.gender || "N/A",
        maritalStatus: owner.personalInformation?.maritalStatus || "N/A",
        snn: formatSSN(owner.personalInformation?.ssNorITIN || "N/A"),
        homePhoneNumber: owner.personalInformation?.homePhoneNumber || "N/A",
        applicantOrder: owner.applicantOrder || "N/A",
        streetAddress: owner.address?.streetAddress || "N/A",
        aptSuite: owner.address?.aptSuite || "N/A",
        city: owner.address?.city || "N/A",
        state: owner.address?.state || "N/A",
        zipCode: owner.address?.zipCode || "N/A"
      }))
      .sort((a, b) => a.applicantOrder - b.applicantOrder) || [];

  const businessOwnerFields = [
    { label: "Weightage", key: "weightage", category: "Weightage Information" },

    // Personal Information
    { label: "Full Name", key: "fullName", category: "Personal Information" },
    { label: "Suffix", key: "suffix", category: "Personal Information" },
    { label: "Date of Birth", key: "dob", category: "Personal Information" },
    { label: "Gender", key: "gender", category: "Personal Information" },
    { label: "Marital Status", key: "maritalStatus", category: "Personal Information" },

    // Contact Information
    { label: "SNN / ITIN", key: "snn", category: "Social Security Number / ITIN Number" },
    { label: "Email", key: "email", category: "Contact Information" },
    { label: "Cell Phone Number", key: "phone", category: "Contact Information" },
    { label: "Home Phone Number", key: "homePhoneNumber", category: "Contact Information" },

    // Address Information
    { label: "Street Address", key: "streetAddress", category: "Address Information" },
    { label: "Apt / Suite", key: "aptSuite", category: "Address Information" },
    { label: "City", key: "city", category: "Address Information" },
    { label: "State", key: "state", category: "Address Information" },
    { label: "Zip Code", key: "zipCode", category: "Address Information" }
  ];

  const businessUploads = account?.documents
    ? [
        {
          title: "Business Document Uploads",
          data: [
            ...(account.documents.businessLicenses?.map((url, index) => ({
              fileName: `Business License ${index + 1}`,
              url: url.url,
              category: "Business Licenses"
            })) || []),
            ...(account.documents.operatingAgreements?.map((url, index) => ({
              fileName: `Operating Agreement ${index + 1}`,
              url: url.url,
              category: "Operating Agreements"
            })) || []),
            ...(account.documents.articleOfIncorporations?.map((url, index) => ({
              fileName: `Article of Incorporation ${index + 1}`,
              url: url.url,
              category: "Articles of Incorporation"
            })) || []),
            ...(account.documents.irsEinReceipt?.map((url, index) => ({
              fileName: `IRS EIN Receipt ${index + 1}`,
              url: url.url,
              category: "IRS EIN Receipts"
            })) || []),
            ...(account.documents.proofOfBusiness?.map((url, index) => ({
              fileName: `Proof of Business ${index + 1}`,
              url: url.url,
              category: "Proof of Business"
            })) || []),
            ...(account.documents.otherDocuments?.map((doc) => ({
              fileName: doc.fileName || doc.url.split("/").pop(),
              url: doc.url,
              category: "Other Documents"
            })) || [])
          ]
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
      <div className={styles.formTitleHeader}>Account Opening Business Review</div>
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

        {/* <InfoSection title="Account Master Information" data={accountMasterInfo} fields={accountMasterFields} defaultActiveKey={"1"} /> */}
        <InfoSection title="Account Master Information" data={accountMasterInfo} fields={accountMasterFields} defaultActiveKey={"1"} />
        <InfoSection title="Validation Questions" data={validationQuestions} fields={validationFields} />
        <InfoSection title="Business Info" data={businessInfo} fields={businessFields} />
        <InfoSection title="Authorised Signer" data={coSignerInfo} fields={coSignerFields} isArray />
        {/* <InfoSection title="Address Information" isArray={true} data={addressInfo} fields={addressInfoField} /> */}

        <InfoSection
          title="Business Document Uploads"
          data={businessUploads[0]?.data}
          fields={[
            { label: "Category", key: "category" },
            { label: "File Name", key: "fileName" },
            { label: "Document URL", key: "url" }
          ]}
          isArray={true}
          isImageSection={true}
          isImageUrl={true}
          baseUrl={IMAGE_URL}
        />

        {businessOwners && businessOwners.length > 0 && (
          <InfoSection
            title="Business Owner Information"
            isArray={true}
            data={businessOwners.map((owner, index) => ({
              ...owner,
              category: `Business Owner ${businessOwners?.length ? "" : index + 1} Information`
            }))}
            fields={businessOwnerFields}
          />
        )}
        {manualACH && <InfoSection title="Manual ACH Information" data={manualACH} fields={manualACHFields} />}
        {fundingInfo && <InfoSection title="Funding Information" data={fundingInfo} fields={fundingFields} />}
      </div>
    </div>
  );
};

export default BusinessReview;
