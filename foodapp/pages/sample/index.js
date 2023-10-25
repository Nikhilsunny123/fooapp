import DataTable from "../../components/common/DataTable";
import { useQuery } from "react-query";
import Loader from "../../components/common/Loader";
import TopBar from "../../components/common/TopBar";
import { useSelector } from "react-redux";
import { selectSnackBarMessage } from "../../store/commonSlice/commonSlice";
import PositionedSnackbar from "../../components/common/PositionedSnackbar";
import voucherCodeServices from "../../services/voucherCode.services/voucherCode.services";
import moment from "moment/moment";
import AddVoucherCode from "../../components/voucher-code-components/AddVoucherCode";
import DeleteVoucherCode from "../../components/voucher-code-components/DeleteVoucherCode";
import { useMemo } from "react";
import UpdateVoucherCode from "../../components/voucher-code-components/UpdateVoucherCode";

const VoucherCode = () => {
  const snackBarMessage = useSelector(selectSnackBarMessage);
  const { isLoading, isError, data } = useQuery(
    ["voucherCode"],
    voucherCodeServices.getAllVoucherCodeService,
    {
      onError: (error) => {
        const responce = error;
        console.log();
        console.error(responce.message);
      },
    }
  );

  const columns = useMemo(
    () => [
      {
        field: "id",

        flex: 1.2,
        headerName: "SL.NO",
        headerClassName: "column-header ",
      },
      {
        field: "voucherCodeName",
        headerName: "Voucher code name",

        flex: 1,

        headerClassName: "column-header ",
      },
      {
        field: "percentage",
        headerName: "Percentage",

        flex: 0.5,
        headerClassName: "column-header ",
      },
      {
        field: "expiryDate",
        headerName: "Expiry date",

        flex: 1,
        headerClassName: "column-header ",
        renderCell: (params) => (
          <div>
            <p
              style={{
                color: moment(params.row?.expiryDate).isBefore() && "red",
              }}
            >
              {moment(params.row?.expiryDate).format("Do MM YYYY, h:mm a")}
            </p>
          </div>
        ),
      },
      {
        field: "edit",
        headerName: "Edit",
        flex: 0.5,

        sortable: false,
        headerClassName: "column-header ",
        renderCell: (params) => <UpdateVoucherCode voucherCode={params.row} />,

        align: "left",
      },

      {
        field: "delete",
        headerName: "Delete",
        sortable: false,
        flex: 0.5,

        headerClassName: "column-header ",
        format: (value) => value.toLocaleString("en-US"),
        renderCell: (params) => <DeleteVoucherCode voucherCode={params.row} />,
      },
    ],
    []
  );

  // Create a row data object for the data table
  function createData(id, voucherCodeName, percentage, expiryDate) {
    return { id, voucherCodeName, percentage, expiryDate };
  }

  // Generate rows for the data table using data retrieved from the API
  const rows = useMemo(() => {
    if (!isError && data?.data?.data) {
      return data.data.data.map((item, index) => {
        return createData(
          item._id || index + 1,
          item.voucherCodeName,
          item.percentage,
          moment(item.expiryDate).format("YYYY-MM-DDTHH:mm:ss")
        );
      });
    }
    return [];
  }, [data, isError]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div className="error-data">Error fetching data</div>;
  }

  return (
    <div className="table-main">
      <TopBar
        HeaderName="Voucher codes"
        SubHeaderName="Manage all voucher codes from here"
      />
      <div className="table-top-button">
        <AddVoucherCode />
      </div>

      {snackBarMessage && <PositionedSnackbar message={snackBarMessage} />}

      <div className="data-table">
        {data?.data.data.length === 0 ? (
          <div className="error-data">No users</div>
        ) : (
          <DataTable columns={columns} rows={rows} />
        )}
      </div>
    </div>
  );
};

export default VoucherCode;
