<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="trip">
                <h2 class="jh-entity-heading"><span v-text="$t('clientApp.trip.detail.title')">Trip</span> {{trip.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('clientApp.trip.startTime')">Start Time</span>
                    </dt>
                    <dd>
                        <span v-if="trip.startTime">{{$d(Date.parse(trip.startTime), 'long') }}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('clientApp.trip.endTime')">End Time</span>
                    </dt>
                    <dd>
                        <span v-if="trip.endTime">{{$d(Date.parse(trip.endTime), 'long') }}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="trip.id" :to="{name: 'TripEdit', params: {tripId: trip.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./trip-details.component.ts">
</script>
