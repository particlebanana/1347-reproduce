/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	buildTransmission: function(req, res) {

		// Create a message
		Message.create({}, function (err, msg) {
			if(err) return res.error(err);

			Transmission.create({ message: msg.id }, function (err, t1) {
				if(err) return res.error(err);

				Transmission.create({ message: msg.id }, function (err, t2) {
					if(err) return res.error(err);

					// Do some weird save
					t2.message = msg.id;

					t2.save(function(err) {
						if(err) return res.error(err);

						Transmission.findOne(t1.id, function (err, t) {
							if(err) return res.error(err);
							if(!t) return res.notFound;
							return res.json({
								t1: t1,
								t2: t2,
								t1Saved: t
							});
						});
					});
				});
			});
		});

	}

};
