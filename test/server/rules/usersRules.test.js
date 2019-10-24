var assert = require("chai").assert;

var strategy = require("../../../server/rules/usersRules");

describe("/server/rules/usersRules", function() {
	describe("validatePassword()", function() {
		it("should validate password with known hashes", function() {
			var password = "knownHashes";
			var passwordHash =
				"12f18bb19bf0e5f253e12da6d507f0903ff7657f2f6aa38af12f4cf6cf2ca6af36d3db9bc53f9dee98eb7baadceb0bc61eeb4b43ac99abb50198cdd5262632ed3d04fa915034da3c37a3aee643247fd92798f23996caf30260f34a25f489b295419ec831965eb1fdb0ef33882ef8da2f0a11f8ff4f8ee0b9c51bb20a04136eb0e02dfd714d2bcab383d19cb6fe2a9875b3675c3e87a072f016ed32298ce54f32f72c0d0396ee917fe3fdf6be8402a1b07250440ea687c9e12c6e9e8a7077ff0292a89ba131c279a70e09f86431a953377469a29a8389b7f3d643960207984f0bcbcd6cb95e495bc0c086f874547d13bbb9a14d3a9b290fd96cdd25540aa48f233aaf914b6f930f5aa28392453524cd95427d18efc66082a92071e282ab7feee8b62ba8e44c4ff2454e60f6a91bdf0f29f54620ff8827ccefa6173f761af09fe883936286fc27c54905d74d7f6a6f1a3c404c9a0176bc7c38e912994c796d9984121785130ffd0d8606f35fe035219ece3c84fb221375ac0983c6fd99eaefaabc76e0df08c1b27b79be1a79692c2a7fd050252d6e0c27941d814992bcf34cd413078826b1c4c102662f1604c9646421c18c146964dd573f889c40e50149ce56a5a8e0f06ba243df0d3fe73a9fdc295c04142f47ed8da5f1154e160455c598329165e3e8cec117e726dab213aa4da414f4398e12211949958659168394931d6e19";
			var passwordHashSalt = "bdc53af377e7eaa9056b2975d51173d1";

			var result = strategy.validatePassword(password, passwordHash, passwordHashSalt);

			assert.isBoolean(result);
			assert.strictEqual(result, true);
		});

		it("should not validate password with known bad hashes", function() {
			var password = "badHashes";
			var passwordHash =
				"e11b816abdcca2bc45d50b54325b89d57ec26be5d18bba1a58368a05fe5754131896337813103b0c916cd681dec697c8d9f1660316e3c0f9ee83d5d5eef497b2b6b3ade6d3685e79b7992ec4d385d8820946baa64d8f4312f9641c46dcf74af30a96497889f55418f49de135dc9693b2cd545dda402bbfe95851bb3783ffe040228a6f1c606975016ef348f7df5abd9c1b25fe4cb599fef2273cdbbbdd9da101e7c0fc536b7eb15459229597017802cca95c2d0b6f774213699676da2164ba1bc249fc9c93a569836ed39f31314168008d032853a25c510ca72e3beb7d59980d6f99b3fc708970a4477789a5a08e76aada4fb771f0b3c03f1f5ef6688ed96cb0d2f238f023120c312ead2ef58e5036643c22b1b18712d7406e5f7a547ca3eb0994257f4b74698219c695e18cf5af16281e72a70886799f0a273b9c79562b9a2a936000e4ed510a4f7b7ce3cca93513f518d2fad7da1cedf8c794453de44415fb12ba2863a60de430b6627217dedcc548a9657b0e32df86e176d1e51a7867f3e5478a184ff7fa075f7d3f7ad4cc8554803d0d35ad520529fc93b291ee3d9697f172976fc6a76e4bbddc45b0435f522f8924786aad889122cc21c2ff1647b1cf6a73271718d55deedf45d906140be31b56d41deccabe6adc4799dff5b7cd79721408488b0e1e20faf6c712549d0d1f76193aa1e8d2340c7d305f5e14f29826fbf9";
			var passwordHashSalt = "24ac8f67c985a765189027d17db3a305";

			var result = strategy.validatePassword(password, passwordHash, passwordHashSalt);

			assert.isBoolean(result);
			assert.strictEqual(result, false);
		});
	});

	describe("buildPasswordHashes()", function() {
		it("should return an object with two strings", function() {
			var password = "tC";
			var result = strategy.buildPasswordHashes(password);

			console.log(result);

			assert.exists(result);
			assert.isNotEmpty(result.passwordHashSalt);
			assert.isString(result.passwordHashSalt);
			assert.isNotEmpty(result.passwordHash);
			assert.isString(result.passwordHash);
		});
	});
});
