# mailchannels-free

Simple demo to use mailchannels for free on vercel edge function (aka cloudflare worker).

```sh
# development
pnpm i
pnpm dev

# release
pnpm build
pnpm release-production
```

Note that, for emails to be actually delivered, the following conditions seem to be required:

- Setting SPF record for the sender (sub)domain
  - https://support.mailchannels.com/hc/en-us/articles/200262610-Set-up-SPF-Records
- Having a working "website" for the sender (sub)domain
  - https://support.mailchannels.com/hc/en-us/articles/203155500-550-5-2-1-SDNF-Sender-Domain-Not-Found

## references

- https://support.mailchannels.com/hc/en-us/articles/4565898358413-Sending-Email-from-Cloudflare-Workers-using-MailChannels-Send-API
- https://blog.cloudflare.com/sending-email-from-workers-with-mailchannels/
- https://api.mailchannels.net/tx/v1/documentation
