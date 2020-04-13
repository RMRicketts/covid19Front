import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Title from "./Title";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const EnhancedTableHead = prop => {
  const { order, orderBy, onRequestSort, headRows } = prop;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow key="headers">
        {headRows.map(rr => (
          <TableCell
            key={rr.id}
            align={rr.numeric ? "right" : "left"}
            padding={rr.disablePadding ? "none" : "default"}
            sortDirection={orderBy === rr.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === rr.id}
              direction={order}
              onClick={createSortHandler(rr.id)}
            >
              {rr.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  headRows: PropTypes.array.isRequired
};

const isNumber = x => {
  return Number(Number.parseFloat(x)) === x;
};

const DisplayTable = props => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const tableHeaders = Object.keys(props.data[0]).map((l, j) => {
    let header = {};
    header.id = l;
    header.label = l;
    if (j === 0) {
      header.disablePadding = true;
    } else {
      header.disablePadding = false;
    }
    header.numeric = isNumber(props.data[0][l]);
    return header;
  });
  const [orderBy, setOrderBy] = React.useState(tableHeaders[0].id);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Title>{props.title}</Title>
      <Table className={classes.table} size="small">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headRows={tableHeaders}
        />
        <TableBody>
          {stableSort(props.data, getSorting(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((dd, index) => {
              return (
                <TableRow key={dd[tableHeaders[0].id]}>
                  {tableHeaders.map((h, i) => {
                    if (i === 0) {
                      return (
                        <TableCell
                          component="th"
                          scope="row"
                          key={dd[tableHeaders[0].id] + "-" + h.id}
                        >
                          {dd[h.id]}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell
                        align="right"
                        key={dd[tableHeaders[0].id] + "-" + h.id}
                      >
                        {dd[h.id]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 33 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page"
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page"
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return { dailyData: state.dailyData };
};

export default withRouter(connect(mapStateToProps)(DisplayTable));
