<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('clientApp.trip.home.title')" id="trip-heading">Trips</span>
            <router-link :to="{name: 'TripCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-trip">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('clientApp.trip.home.createLabel')">
                    Create a new Trip
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && trips && trips.length === 0">
            <span v-text="$t('clientApp.trip.home.notFound')">No trips found</span>
        </div>
        <div class="table-responsive" v-if="trips && trips.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('startTime')"><span v-text="$t('clientApp.trip.startTime')">Start Time</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'startTime'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('endTime')"><span v-text="$t('clientApp.trip.endTime')">End Time</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'endTime'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="trip in trips"
                    :key="trip.id">
                    <td>
                        <router-link :to="{name: 'TripView', params: {tripId: trip.id}}">{{trip.id}}</router-link>
                    </td>
                    <td>{{trip.startTime ? $d(Date.parse(trip.startTime), 'short') : ''}}</td>
                    <td>{{trip.endTime ? $d(Date.parse(trip.endTime), 'short') : ''}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'TripView', params: {tripId: trip.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'TripEdit', params: {tripId: trip.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(trip)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="clientApp.trip.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-trip-heading" v-text="$t('clientApp.trip.delete.question', {'id': removeId})">Are you sure you want to delete this Trip?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-trip" v-text="$t('entity.action.delete')" v-on:click="removeTrip()">Delete</button>
            </div>
        </b-modal>
        <div v-show="trips && trips.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./trip.component.ts">
</script>
