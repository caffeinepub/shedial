export function PrivacyPolicyTab() {
  return (
    <div className="px-5 pb-32">
      <div className="space-y-6 text-white/80 text-sm leading-relaxed">
        <div>
          <p className="text-white/50 text-xs">Last updated: March 2026</p>
        </div>

        <section>
          <h3 className="text-white font-bold text-base mb-2">
            1. About SheDial
          </h3>
          <p>
            SheDial is a women's safety application developed by Dr Muskan
            Khosla (muskankhosla001@gmail.com). This app provides emergency SOS
            alerts, fake call simulation, and access to national helplines to
            help keep women safe.
          </p>
        </section>

        <section>
          <h3 className="text-white font-bold text-base mb-2">
            2. Data We Collect
          </h3>
          <p className="mb-2">
            SheDial collects only what is necessary for safety features:
          </p>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>
              <strong className="text-white/90">Location (GPS):</strong> Used
              only during SOS to include your coordinates in the emergency
              message. Not stored or transmitted to any server.
            </li>
            <li>
              <strong className="text-white/90">Emergency Contacts:</strong>{" "}
              Stored locally on your device only. Never uploaded to any server.
            </li>
            <li>
              <strong className="text-white/90">Device Motion:</strong> Used for
              shake-to-SOS detection. Not recorded or stored.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-white font-bold text-base mb-2">
            3. How We Use Your Data
          </h3>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>
              Location is included in SOS SMS messages sent to your emergency
              contacts.
            </li>
            <li>
              No data is shared with third parties, advertisers, or governments.
            </li>
            <li>No analytics, tracking, or profiling is performed.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white font-bold text-base mb-2">
            4. Permissions Required
          </h3>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>
              <strong className="text-white/90">Location:</strong> To include
              GPS coordinates in SOS messages.
            </li>
            <li>
              <strong className="text-white/90">Contacts / SMS:</strong> To open
              the SMS app pre-filled with your emergency contacts and message.
            </li>
            <li>
              <strong className="text-white/90">Microphone (optional):</strong>{" "}
              For fake call audio simulation.
            </li>
            <li>
              <strong className="text-white/90">Motion Sensors:</strong> For
              shake-to-SOS detection.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-white font-bold text-base mb-2">
            5. Data Storage & Security
          </h3>
          <p>
            All data (contacts, settings) is stored locally on your device using
            browser localStorage. Nothing is sent to or stored on any external
            server. You can delete all data at any time by clearing your browser
            data or uninstalling the app.
          </p>
        </section>

        <section>
          <h3 className="text-white font-bold text-base mb-2">
            6. Children's Privacy
          </h3>
          <p>
            SheDial is designed for users aged 13 and above. We do not knowingly
            collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h3 className="text-white font-bold text-base mb-2">
            7. Changes to This Policy
          </h3>
          <p>
            We may update this policy as the app evolves. Any changes will be
            reflected here with a new date.
          </p>
        </section>

        <section>
          <h3 className="text-white font-bold text-base mb-2">8. Contact</h3>
          <p>
            For any questions or concerns about this privacy policy, contact:
          </p>
          <p className="mt-2 text-red-400 font-medium">Dr Muskan Khosla</p>
          <p className="text-red-400">muskankhosla001@gmail.com</p>
        </section>
      </div>
    </div>
  );
}
