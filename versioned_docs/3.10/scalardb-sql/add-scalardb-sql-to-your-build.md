# Add ScalarDB SQL to Your Build

The ScalarDB SQL libraries are available as [packages on GitHub](https://github.com/orgs/scalar-labs/packages?repo_name=scalardb-sql). You can add the libraries as a build dependency to your application by using Gradle or Maven.

{% capture notice--warning %}
**Attention**

You must have a commmercial license and permission to access the ScalarDB SQL libraries. If you need a commercial license, please [contact us](https://scalar-labs.com/contact_us/).
{% endcapture %}

<div class="notice--warning">{{ notice--warning | markdownify }}</div>

## Configure your application based on your build tool

Select your build tool, and follow the instructions to add the build dependency for ScalarDB SQL for your application.

<div id="tabset-1">
<div class="tab">
  <button class="tablinks" onclick="openTab(event, 'Gradle', 'tabset-1')" id="defaultOpen-1">Gradle</button>
  <button class="tablinks" onclick="openTab(event, 'Maven', 'tabset-1')">Maven</button>
</div>

<div id="Gradle" class="tabcontent" markdown="1">

The following instructions describe how to add the build dependency for ScalarDB SQL to your application by using Gradle. For details about using package repositories with Gradle, see [Working with the Gradle registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-gradle-registry).

## Configure your GitHub credentials for Gradle
{:.no_toc}

Before adding the build dependency for ScalarDB SQL to your application by using Gradle, you need to configure your GitHub credentials to access the package repository.

To access the dependency on GitHub, add the following to `build.gradle` in your application:

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

To configure the `gpr.user` property for your GitHub username and the `gpr.key` property for your personal access token, do one of the following:

- **Store your GitHub credentials as properties in `~/.gradle/gradle.properties`**
  - Open `~/.gradle/gradle.properties`, and store your GitHub credentials as properties by running the following command, replacing `<GITHUB_USERNAME>` with your username and `<GITHUB_PERSONAL_ACCESS_TOKEN>` with a personal access token:
  ```shell
  $ ./gradlew build -Pgpr.user=<GITHUB_USERNAME> -Pgpr.key=<GITHUB_PERSONAL_ACCESS_TOKEN>
  ```

- **Store your GitHub credentials as environment variables**
  1. Open a terminal window, and store your GitHub username as an environment variable by running the following command, replacing `<GITHUB_USERNAME>` with your username:
  ```shell
  $ export USERNAME=<GITHUB_USERNAME>
  ```
  1. Store your GitHub personal access token as an environment variable by running the following command, replacing `<GITHUB_PERSONAL_ACCESS_TOKEN>` with a personal access token:
  ```shell
  $ export TOKEN=<GITHUB_PERSONAL_ACCESS_TOKEN>
  ```

## Add the build dependency for ScalarDB SQL by using Gradle
{:.no_toc}

After specifying your GitHub credentials, add the following ScalarDB SQL dependency to `build.gradle` in your application, replacing `<VERSION>` with the version of ScalarDB SQL that you want to use:

```gradle
dependencies {
  // For Direct mode
  implementation 'com.scalar-labs:scalardb-sql-direct-mode:<VERSION>'

  // For Server mode
  implementation 'com.scalar-labs:scalardb-sql-server-mode:<VERSION>'
}
```

</div>
<div id="Maven" class="tabcontent" markdown="1">

The following instructions describe how to add the build dependency for ScalarDB SQL to your application by using Maven. For details about using package repositories with Maven, see [Working with the Apache Maven registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-apache-maven-registry)

## Configure your GitHub credentials for Maven
{:.no_toc}

Before adding the build dependency for ScalarDB SQL to your application by using Maven, you need to configure your GitHub credentials to access the package repository.

To access the dependency on GitHub, add the following to `~/.m2/settings.xml` in your application, replacing `<GITHUB_USERNAME>` with your username and `<GITHUB_PERSONAL_ACCESS_TOKEN>` with a personal access token in the child `server` in the `servers` tag:

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
      <username><GITHUB_USERNAME></username>
      <password><GITHUB_PERSONAL_ACCESS_TOKEN></password>
    </server>
  </servers>
</settings>
```

## Add the build dependency for ScalarDB SQL by using Maven
{:.no_toc}

After specifying your GitHub credentials, add the following ScalarDB SQL dependency to `pom.xml` in your application, replacing `<VERSION>` with the version of ScalarDB SQL that you want to use:

```xml
<dependencies>
  <!-- For Direct mode -->
  <dependency>
    <groupId>com.scalar-labs</groupId>
    <artifactId>scalardb-sql-direct-mode</artifactId>
    <version><VERSION></version>
  </dependency>

  <!-- For Server mode -->
  <dependency>
    <groupId>com.scalar-labs</groupId>
    <artifactId>scalardb-sql-server-mode</artifactId>
    <version><VERSION></version>
  </dependency>
</dependencies>
```

</div>
</div>
