 // playlist: audio array. each of audios: name, url 
 function Player(playlist) {
     this.playlist = playlist;
     console.log(playlist);
     this.index = 0;
 }

 Player.prototype = {
     play: function (index) {
         var self = this;
         index = typeof index === 'number' ? index : self.index;
         const audio = this.playlist[index];
         var sound = audio.howl;
         if (!sound) {
             sound = audio.howl = new Howl({
                 src: [audio.audioUrl],
                 html5: true,
                 onplay: function () {
                    $('#audio-name').html(self.playlist[self.index].name);

                     // Display the duration.
                     $('#audio-duration').html(self.formatTime(Math.round(sound.duration())));

                     // Start updating the progress of the track.
                     requestAnimationFrame(self.step.bind(self));
                 },
                 onload: function () {

                 },
                 onend: function () {
                     // When this track goes end, play the next
                     this.skip('next');
                 },
                 onpause: function () {},
                 onstop: function () {},
                 onseek: function () {
                     // Start updating the progress of the track.
                     requestAnimationFrame(self.step.bind(self));
                 }
             });
         }
         audio.howl.play();
         $('#play-audio-btn').css({'display': 'none'});
         $('#pause-audio-btn').css({'display': 'inline'});
     },

     pause: function () {
         var self = this;

         // Get the Howl we want to manipulate.
         var sound = self.playlist[self.index].howl;

         // Puase the sound.
         sound.pause();
         $('#play-audio-btn').css({'display': 'inline'});
         $('#pause-audio-btn').css({'display': 'none'});
     },

     skip: function (direction) {
         var self = this;

         // Get the next track based on the direction of the track.
         var index = 0;
         if (direction === 'prev') {
             index = self.index - 1;
             if (index < 0) {
                 index = self.playlist.length - 1;
             }
         } else {
             index = self.index + 1;
             if (index >= self.playlist.length) {
                 index = 0;
             }
         }

         self.skipTo(index);
     },

     /** 
      * Stop current track and play the track of 
      * assigned index
      */
     skipTo: function (index) {
         var self = this;

         // Stop the current track.
         if (self.playlist[self.index].howl) {
             self.playlist[self.index].howl.stop();
         }

         // Reset progress.
         progress.style.width = '0%';

         // Play the new track.
         self.play(index);
     },

     /**
      * Seek to a new position in the currently playing track.
      * @param  {Number} per Percentage through the song to skip.
      */
     seek: function (per) {
         var self = this;

         // Get the Howl we want to manipulate.
         var sound = self.playlist[self.index].howl;

         // Convert the percent into a seek position.
         if (sound.playing()) {
             sound.seek(sound.duration() * per);
         }
     },

     /**
      * The step called within requestAnimationFrame to update the playback position.
      */
     step: function () {
         var self = this;

         // Get the Howl we want to manipulate.
         var sound = self.playlist[self.index].howl;

         // Determine our current seek position.
         var seek = sound.seek() || 0;
         $('#audio-timer').html(self.formatTime(Math.round(seek)) + "/");
         progress.style.width = (((seek / sound.duration()) * 100) || 0) + '%';

         // If the sound is still playing, continue stepping.
         if (sound.playing()) {
             requestAnimationFrame(self.step.bind(self));
         }
     },
     /**
      * Format the time from seconds to M:SS.
      * @param  {Number} secs Seconds to format.
      * @return {String}      Formatted time.
      */
     formatTime: function (secs) {
         var minutes = Math.floor(secs / 60) || 0;
         var seconds = (secs - minutes * 60) || 0;

         return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
     }
 }


 var progress = $('#audio-progressbar').get(0);

 $(() => {
     $('#prev-audio-btn').click(() => {
         if (player) {
             player.skip('prev');
         }
         return false;
     });
     $('#play-audio-btn').click(() => {
         if (player) {
             player.play();
         }
         return false;
     });
     $('#pause-audio-btn').click(() => {
         if (player) {
             player.pause();
         }
         return false;
     });
     $('#next-audio-btn').click(() => {
         if (player) {
             player.skip('next');
         }
         return false;
     });
     document.getElementById('audio-progressbar-lay').addEventListener('click', function(event) {
        player.seek(event.clientX / window.innerWidth);
        return false;
      });
 });