<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="clientApp.location.home.createOrEditLabel" v-text="$t('clientApp.location.home.createOrEditLabel')">Create or edit a Location</h2>
                <div>
                    <div class="form-group" v-if="location.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="location.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('clientApp.location.heading')" for="location-heading">Heading</label>
                        <input type="number" class="form-control" name="heading" id="location-heading"
                            :class="{'valid': !$v.location.heading.$invalid, 'invalid': $v.location.heading.$invalid }" v-model.number="$v.location.heading.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('clientApp.location.latitude')" for="location-latitude">Latitude</label>
                        <input type="number" class="form-control" name="latitude" id="location-latitude"
                            :class="{'valid': !$v.location.latitude.$invalid, 'invalid': $v.location.latitude.$invalid }" v-model.number="$v.location.latitude.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('clientApp.location.longitude')" for="location-longitude">Longitude</label>
                        <input type="number" class="form-control" name="longitude" id="location-longitude"
                            :class="{'valid': !$v.location.longitude.$invalid, 'invalid': $v.location.longitude.$invalid }" v-model.number="$v.location.longitude.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('clientApp.location.speed')" for="location-speed">Speed</label>
                        <input type="number" class="form-control" name="speed" id="location-speed"
                            :class="{'valid': !$v.location.speed.$invalid, 'invalid': $v.location.speed.$invalid }" v-model.number="$v.location.speed.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('clientApp.location.trip')" for="location-trip">Trip</label>
                        <select class="form-control" id="location-trip" name="trip" v-model="location.trip">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="location.trip && tripOption.id === location.trip.id ? location.trip : tripOption" v-for="tripOption in trips" :key="tripOption.id">{{tripOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.location.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./location-update.component.ts">
</script>
