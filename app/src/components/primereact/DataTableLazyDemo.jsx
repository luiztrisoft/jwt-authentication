import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CustomerService } from './CustomerService';

export class DataTableLazyDemo extends Component {

    /**
     * https://www.primefaces.org/primereact/datatable/lazy/
     * 
     * PRIMEREACT SEMPRE ME SALVANDO. MELHOR MODELO ATÉ AGORA
     */

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            totalRecords: 0,
            customers: null,
            selectAll: false,
            selectedCustomers: null,
            selectedRepresentative: null,
            lazyParams: {
                first: 0,
                rows: 10,
                page: 1,
                sortField: null,
                sortOrder: null,
                filters: {
                    'name': { value: '', matchMode: 'contains' },
                    'country.name': { value: '', matchMode: 'contains' },
                    'company': { value: '', matchMode: 'contains' },
                    'representative.name': { value: '', matchMode: 'contains' },
                }
            }
        };

        this.loadLazyData = this.loadLazyData.bind(this);
        this.onPage = this.onPage.bind(this);
        this.onSort = this.onSort.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.onSelectAllChange = this.onSelectAllChange.bind(this);

        this.customerService = new CustomerService();
        this.loadLazyTimeout = null;
    }

    loadLazyData() {
        this.setState({ loading: true });

        if (this.loadLazyTimeout) {
            clearTimeout(this.loadLazyTimeout);
        }

        //imitate delay of a backend call
        this.loadLazyTimeout = setTimeout(() => {
            this.customerService.getCustomers({ lazyEvent: JSON.stringify(this.state.lazyParams) }).then(data => {
                this.setState({
                    totalRecords: data.totalRecords,
                    customers: data.customers,
                    loading: false
                });
            });
        }, Math.random() * 1000 + 250);
    }

    onPage(event) {
        this.setState({ lazyParams: event }, this.loadLazyData);
    }

    onSort(event) {
        this.setState({ lazyParams: event }, this.loadLazyData);
    }

    onFilter(event) {
        event['first'] = 0;
        this.setState({ lazyParams: event }, this.loadLazyData);
    }

    onSelectionChange(event) {
        const value = event.value;
        this.setState({ selectedCustomers: value, selectAll: value.length === this.state.totalRecords });
    }

    onSelectAllChange(event) {
        const selectAll = event.checked;

        if (selectAll) {
            this.customerService.getCustomers().then(data => {
                this.setState({
                    selectAll: true,
                    selectedCustomers: data.customers
                });
            });
        }
        else {
            this.setState({
                selectAll: false,
                selectedCustomers: []
            });
        }
    }

    componentDidMount() {
        this.loadLazyData();
    }

    representativeBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <img alt={rowData.representative.name} src={`images/avatar/${rowData.representative.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{rowData.representative.name}</span>
            </React.Fragment>
        );
    }

    countryBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <img alt="flag" src="/images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.country.code}`} width={30} />
                <span className="image-text">{rowData.country.name}</span>
            </React.Fragment>
        );
    }

    render() {
        return (
            <div>
                <div className="card">
                    <DataTable value={this.state.customers} lazy filterDisplay="row" responsiveLayout="scroll" dataKey="id"
                        paginator first={this.state.lazyParams.first} rows={10} totalRecords={this.state.totalRecords} onPage={this.onPage}
                        onSort={this.onSort} sortField={this.state.lazyParams.sortField} sortOrder={this.state.lazyParams.sortOrder}
                        onFilter={this.onFilter} filters={this.state.lazyParams.filters} loading={this.state.loading}
                        selection={this.state.selectedCustomers} onSelectionChange={this.onSelectionChange}
                        selectAll={this.state.selectAll} onSelectAllChange={this.onSelectAllChange} 
                        style={{fontFamily:"Ubuntu", fontSize: "12px", margin: 0, padding: 0}}       >
                        <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                        <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" />
                        <Column field="country.name" sortable header="Country" filterField="country.name" body={this.countryBodyTemplate} filter filterPlaceholder="Search by country" />
                        <Column field="company" sortable filter header="Company" filterPlaceholder="Search by company" />
                        <Column field="representative.name" header="Representative" body={this.representativeBodyTemplate} filter filterPlaceholder="Search by representative" />
                    </DataTable>
                </div>
            </div>
        );
    }
}

export default DataTableLazyDemo;