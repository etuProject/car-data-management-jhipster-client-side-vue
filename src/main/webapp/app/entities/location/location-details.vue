<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="location">
                <h2 class="jh-entity-heading"><span v-text="$t('clientApp.location.detail.title')">Location</span> {{location.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('clientApp.location.heading')">Heading</span>
                    </dt>
                    <dd>
                        <span>{{location.heading}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('clientApp.location.latitude')">Latitude</span>
                    </dt>
                    <dd>
                        <span>{{location.latitude}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('clientApp.location.longitude')">Longitude</span>
                    </dt>
                    <dd>
                        <span>{{location.longitude}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('clientApp.location.speed')">Speed</span>
                    </dt>
                    <dd>
                        <span>{{location.speed}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('clientApp.location.trip')">Trip</span>
                    </dt>
                    <dd>
                        <div v-if="location.trip">
                            <router-link :to="{name: 'TripView', params: {tripId: location.trip.id}}">{{location.trip.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="location.id" :to="{name: 'LocationEdit', params: {locationId: location.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./location-details.component.ts">
</script>
