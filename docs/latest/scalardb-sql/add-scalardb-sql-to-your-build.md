# Add ScalarDB SQL to your build

The libraries for ScalarDB SQL are available on [Packages in this repository](https://github.com/orgs/scalar-labs/packages?repo_name=scalardb-sql).
Since they are available under a commercial license, you need to get the license and permission to access them.
For more details, please [contact us](https://scalar-labs.com/contact_us/).

Before you add the dependency, you need to add the Maven repository using your build tool such as Gradle and Maven.

To add the Maven repository using Gradle, add the following repository to your `build.gradle`:
```gradle
repositories {
    maven {
        url = uri("https://maven.pkg.github.com/scalar-labs/scalardb-sql")
        credentials {
            username = project.findProperty("gpr.user") ?: System.getenv("USERNAME")
            password = project.findProperty("gpr.key") ?: System.getenv("TOKEN")
        }
    }
}
```

In this case, you need the `gpr.user` property for your GitHub username and the `gpr.key` property for your personal access token.
So you need to have the properties in `~/.gradle/gradle.properties`, or specify the properties with the `-P` option when running the `./gradlew` command as follows:

```shell
$ ./gradlew build -Pgpr.user=<your GitHub username> -Pgpr.key=<your personal access token>
```

Or you can also use environment variables, `USERNAME` for your GitHub username and `TOKEN` for your personal access token.

```shell
$ export USERNAME=<your GitHub username>
$ export TOKEN=<your personal access token>
```

To add the Maven repository using Maven, edit your `~/.m2/settings.xml` file as follows:
```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      http://maven.apache.org/xsd/settings-1.0.0.xsd">

  <activeProfiles>
    <activeProfile>github</activeProfile>
  </activeProfiles>

  <profiles>
    <profile>
      <id>github</id>
      <repositories>
        <repository>
          <id>central</id>
          <url>https://repo1.maven.org/maven2</url>
        </repository>
        <repository>
          <id>github</id>
          <url>https://maven.pkg.github.com/scalar-labs/scalardb-sql</url>
          <snapshots>
            <enabled>true</enabled>
          </snapshots>
        </repository>
      </repositories>
    </profile>
  </profiles>

  <servers>
    <server>
      <id>github</id>
      <username>USERNAME</username>
      <password>TOKEN</password>
    </server>
  </servers>
</settings>
```

In the `servers` tag, add a child `server` tag with an `id`, replacing *USERNAME* with your GitHub username, and *TOKEN* with your personal access token.

Please see also the following documents for more details:
- [Working with the Gradle registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-gradle-registry)
- [Working with the Apache Maven registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-apache-maven-registry)

And then, you can install the library in your application using your build tool such as Gradle and Maven.

To add a dependency on ScalarDB SQL using Gradle, use the following:
```gradle
dependencies {
    // For Direct mode
    implementation 'com.scalar-labs:scalardb-sql-direct-mode:3.10.1'

    // For Server mode
    implementation 'com.scalar-labs:scalardb-sql-server-mode:3.10.1'
}
```

To add a dependency using Maven:
```xml
<dependencies>
  <!-- For Direct mode -->
  <dependency>
    <groupId>com.scalar-labs</groupId>
    <artifactId>scalardb-sql-direct-mode</artifactId>
    <version>3.10.1</version>
  </dependency>

  <!-- For Server mode -->
  <dependency>
    <groupId>com.scalar-labs</groupId>
    <artifactId>scalardb-sql-server-mode</artifactId>
    <version>3.10.1</version>
  </dependency>
</dependencies>
```
