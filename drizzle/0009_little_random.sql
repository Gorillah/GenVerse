ALTER TABLE `user_api_limit` DROP CONSTRAINT `user_api_limit_user_id_unique2`;--> statement-breakpoint
ALTER TABLE `user_api_limit` ADD CONSTRAINT `user_api_limit_user_id_unique` UNIQUE(`user_id`);