<template>
  <div>
    <v-container>
        <div class="col-md-8">
          <v-card outlined>
            <v-card-text>
                   <center>
                <h1 style="color:white;"><v-icon>mdi-youtube</v-icon>&nbsp;วิธีสั่งซื้อ</h1>
                <br>
            </center>
            <div class="videoWrapper">

              <iframe
                src="https://www.youtube.com/embed/mJTuATMIwZw"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>

            </v-card-text>
          </v-card>
        </div>
    </v-container>
  </div>
</template>


<style scoped>
    .videoWrapper {
        position: relative;
        padding-bottom: 56.25%;
        /* 16:9 */
        padding-top: 25px;
        height: 0;
    }

    .videoWrapper iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>