import { useState, useRef, useEffect} from "react";
import styles from "../Table/Table.component.module.css";

export const LeadsTable = ({
  data,
  page,
  pageSelectionLeft,
  pageSelectionRight,
  handleEditModal,

}) => {

  const popupRef = useRef(null)
  
  const [selectedlead, setSelectedLead] = useState(null);
  function handlePopUp(lead) {
    setSelectedLead(lead)
  }

  useEffect(()=>{
    function handleClickOutside(event){
      if(popupRef.current && !popupRef.current.contains(event.target)){
        setSelectedLead(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return ()=> {
       document.removeEventListener("mousedown", handleClickOutside);
    }
  },[])

  return (
    <>
      <div className={styles.pagination}>
        <button disabled={page === 1} onClick={pageSelectionLeft}>
          <svg
            width="14"
            height="28"
            viewBox="0 0 14 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.15017 14.8296L8.75001 21.4294L10.3997 19.7797L4.62467 14.0047L10.3997 8.22974L8.75001 6.58008L2.15017 13.1799C1.93146 13.3987 1.80859 13.6954 1.80859 14.0047C1.80859 14.3141 1.93146 14.6108 2.15017 14.8296Z"
              fill="black"
            />
          </svg>
        </button>

        <span>
          {page} / {data?.pagination?.totalPages}
        </span>

        <button
          disabled={page === data?.pagination?.totalPages}
          onClick={pageSelectionRight}
        >
          <svg
            width="14"
            height="28"
            viewBox="0 0 14 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.8498 14.8296L5.24999 21.4294L3.60033 19.7797L9.37533 14.0047L3.60033 8.22974L5.24999 6.58008L11.8498 13.1799C12.0685 13.3987 12.1914 13.6954 12.1914 14.0047C12.1914 14.3141 12.0685 14.6108 11.8498 14.8296Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Client Name</th>
            <th>Project Info</th>
            <th>Status</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {data?.leads?.map((lead) => {
            return (
              <tr className={styles.tableTabs}>
                <td className={styles.actionCell}>
                  {selectedlead?._id===lead?._id && (
                    <div ref={popupRef} className={styles.popupBox}>
                      <p onClick={()=>handleEditModal(lead)}>Edit</p>
                    </div>
                  )}
                  <svg
                    onClick={()=>handlePopUp(lead)}
                    width="3"
                    height="11"
                    viewBox="0 0 3 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.1998 0.599976C1.04067 0.599976 0.888063 0.66319 0.775541 0.775712C0.663019 0.888233 0.599805 1.04085 0.599805 1.19998C0.599805 1.35911 0.663019 1.51172 0.775541 1.62424C0.888063 1.73676 1.04067 1.79998 1.1998 1.79998C1.35893 1.79998 1.51155 1.73676 1.62407 1.62424C1.73659 1.51172 1.7998 1.35911 1.7998 1.19998C1.7998 1.04085 1.73659 0.888233 1.62407 0.775712C1.51155 0.66319 1.35893 0.599976 1.1998 0.599976ZM1.1998 4.79998C1.04067 4.79998 0.888063 4.86319 0.775541 4.97571C0.663019 5.08823 0.599805 5.24085 0.599805 5.39998C0.599805 5.55911 0.663019 5.71172 0.775541 5.82424C0.888063 5.93676 1.04067 5.99998 1.1998 5.99998C1.35893 5.99998 1.51155 5.93676 1.62407 5.82424C1.73659 5.71172 1.7998 5.55911 1.7998 5.39998C1.7998 5.24085 1.73659 5.08823 1.62407 4.97571C1.51155 4.86319 1.35893 4.79998 1.1998 4.79998ZM1.1998 8.99998C1.04067 8.99998 0.888063 9.06319 0.775541 9.17571C0.663019 9.28823 0.599805 9.44085 0.599805 9.59998C0.599805 9.75911 0.663019 9.91172 0.775541 10.0242C0.888063 10.1368 1.04067 10.2 1.1998 10.2C1.35893 10.2 1.51155 10.1368 1.62407 10.0242C1.73659 9.91172 1.7998 9.75911 1.7998 9.59998C1.7998 9.44085 1.73659 9.28823 1.62407 9.17571C1.51155 9.06319 1.35893 8.99998 1.1998 8.99998Z"
                      stroke="#292929"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </td>
                <td>{lead.clientName}</td>
                <td>{lead.projectInfo}</td>
                <td>{lead.status}</td>
                <td>{lead.source}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
